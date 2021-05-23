import express from 'express'
import {getMovies, createMovie,updateMovie,deleteMovie} from '../controllers/movies.js'
const router=express.Router()

router.get('/',getMovies)
router.post('/',createMovie)
router.put('/',updateMovie)
router.delete('/',deleteMovie)

export default router;