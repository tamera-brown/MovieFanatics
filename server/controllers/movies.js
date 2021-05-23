import Movie from '../models/movieModel.js'

export const getMovies=async(req,res)=>{
    try {
        const getAll=await Movie.find();
        res.status(200).json(getAll);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    };

export const createMovie=async(req,res)=>{
    const movie=req.body
    const newMovie=new Movie(movie)
try {
    await newMovie.save()
    res.send(201).json(newMovie)
} catch (error) {
    res.status(409).json({message:error.message})
}
}

export const updateMovie=(req,res)=>{

}

export const deleteMovie=(req,res)=>{

}