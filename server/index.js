import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import movieRoutes from './routes/movies.js'
import dotenv from 'dotenv'

const app=express();
dotenv.config()

app.use(bodyParser.json({limit: "30mb",extented:true}))
app.use(bodyParser.urlencoded({limit: "30mb",extented:true}))
app.use(cors());
app.use('/movies',movieRoutes)


const PORT=process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify',false)