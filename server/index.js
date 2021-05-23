import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import movieRoutes from './routes/movies.js'

const app=express();

app.use('/movies',movieRoutes)

app.use(bodyParser.json({limit: "30mb",extented:true}))
app.use(bodyParser.urlencoded({limit: "30mb",extented:true}))
app.use(cors());


const PORT=process.env.PORT || 5000

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify',false)