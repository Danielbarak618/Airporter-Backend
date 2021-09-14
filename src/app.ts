import express  , {Application,Request,Response} from 'express'
import cors from 'cors'
import { ConnectOptions , connect } from 'mongoose'
import arrivalRoutes from './routes/arrival'
import departuresRoutes from './routes/departure'
import dotenv from 'dotenv'

type ConnectionOptionsExtend = {
    useNewUrlParser: boolean
    useUnifiedTopology: boolean
    useFindAndModify:boolean,
    useCreateIndex:boolean
}

const options: ConnectOptions & ConnectionOptionsExtend = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex:true
}

const app: Application = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/arrivals', arrivalRoutes)
app.use('/departures', departuresRoutes)

app.get('/' , (req:Request,res:Response) => {
    res.send('Hello')
})

const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT || 5000;

connect(CONNECTION_URL, options)
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
