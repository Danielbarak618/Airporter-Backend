import express from 'express'
import { getDepartures } from '../controllers/departures'
import { updateDeparture } from '../controllers/departures'


const router = express.Router()

router.post('/' , getDepartures)
router.patch('/:id' , updateDeparture)


export default router