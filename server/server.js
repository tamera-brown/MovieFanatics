const mogoose= require('mongoose')
const express = require('express');
const authRoute = require("./routes/auth");
const dotenv = require('dotenv')
const cors = require('cors')
const port = process.env.PORT || 8080;

const app = express();


dotenv.config()


const connect = mogoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => {
        console.log('MongoDB Connected...')
    })
    .catch( (err) => {
        console.error(err);
    })

app.use(cors())
app.use(express.json())
	
app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
 });