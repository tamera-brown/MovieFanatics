import Movie from '../models/movieModel.js'
import mongoose from 'mongoose'

export const getMovies=async(req,res)=>{
    try {
        const getAll=await Movie.find();
        res.status(200).json(getAll);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    };
    export const getMovie = async (req, res) => { 
        const { id } = req.params;
    
        try {
            const post = await Movie.findById(id);
            
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
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

export const updateMovie=async(req,res)=>{
    const { id } = req.params;
    const { Name,Description,Director,Cast,Rated,ReleaseDate,Length,Cover,Genre,Score,watchLink} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedMovie = { Name,Description,Director,Cast,Rated,ReleaseDate,Length,Cover,Genre,Score,watchLink,_id: id };

    await Movie.findByIdAndUpdate(id, updatedMovie, { new: true });

    res.json(updatedMovie);
}

export const deleteMovie=async(req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Movie.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}