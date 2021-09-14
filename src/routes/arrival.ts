import express from 'express'
import { getArrivals , updateFlight} from '../controllers/arrivals'

const router = express.Router()

router.post('/' , getArrivals)
router.patch('/:id',updateFlight)


export default router