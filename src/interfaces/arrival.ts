import {Document} from 'mongoose'


export default interface Arrival extends Document{
    arrivalAirportCandidatesCount:number,
    callsign:string,
    departureAirportCandidatesCount:number,
    estArrivalAirport:string,
    estArrivalAirportHorizDistance:number,
    estArrivalAirportVertDistance:number,
    estDepartureAirport:string,
    estDepartureAirportHorizDistance:number,
    estDepartureAirportVertDistance:number,
    firstSeen:number,
    icao24:string,
    lastSeen:number,
    status:string
}

//614078a338724d2bd58c6180