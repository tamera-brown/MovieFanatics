import axios from 'axios'

const url='http://localhost:5000/movies'

export const getMovies=()=>axios.get(url)
export const createMovie = (newMovie) => axios.post(url, newMovie);
export const updateMovie = (id, updatedMovie) => axios.patch(`${url}/${id}`, updatedMovie);
export const deleteMovie = (id) => axios.delete(`${url}/${id}`);