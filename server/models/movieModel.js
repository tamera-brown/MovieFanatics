import mongoose from 'mongoose'
import { time } from 'node:console'

const movieSchema=mongoose.Schema({
    Name:String,
    Description:String,
    Director: [String],
    Cast: [String],
    Rated:String,
    ReleaseDate:Date,
    Length:String,
    Cover:String,
    Genre:[String],
    Score:Number,
    watchLink:String,
    Reviews:{
        picture:String,
        rating:Number,
        message:String

    }

})
const postMovie=mongoose.model('movie',movieSchema)

export default postMovie;