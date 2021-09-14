import axios from 'axios'
import mongoose from 'mongoose'
import {Request , Response} from 'express'
import Departures from '../models/departures'

export const getDepartures = async (req:Request,res:Response) => {
    
    const {airport , time} = req.body
    try{
        const {data} = await axios.get(`https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${time}&end=${time+3600}`)
        
        const fixedData = data.map((f)=>{
            return {
                ...f,
                status:'New'
            }
        })
        
        await Departures.deleteMany({})
        const departures = await Departures.insertMany(fixedData)
        res.status(200).json(departures)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}


export const updateDeparture = async(req:Request,res:Response) =>{
    const {id:_id} = req.params
    const {status} = req.body
    console.log(status);
    if(!mongoose.Types.ObjectId.isValid(_id))  return res.status(404).send('No data with id' + _id)
    try{
        const updatedFlight = await Departures.findByIdAndUpdate(_id , {$set:{'status':status}})
        res.status(200).json(updatedFlight)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}



