import axios from 'axios'
import {Request , Response} from 'express'
import mongoose from 'mongoose'
import Arrival from '../models/arrival'


export const getArrivals = async (req:Request,res:Response) => {
    
    const {airport , time} = req.body
    try{
        const {data} = await axios.get(`https://opensky-network.org/api/flights/arrival?airport=${airport}&begin=${time}&end=${time+7200}`)
        const fixedData = data.map((f)=>{
            return {
                ...f,
                status:'New'
            }
        })
        await Arrival.deleteMany({})
        const arrivals = await Arrival.insertMany(fixedData)
        res.status(200).json(arrivals)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const updateFlight = async (req:Request,res:Response) => {
    const {id:_id} = req.params
    const {status} = req.body
    console.log(status);
    if(!mongoose.Types.ObjectId.isValid(_id))  return res.status(404).send('No data with id' + _id)
    try{
        const updatedFlight = await Arrival.findByIdAndUpdate(_id , {$set:{'status':status}})
        res.status(200).json(updatedFlight)
    }catch(err){
        res.status(404).json({message:err.message})
    }
    

}