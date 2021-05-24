import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createMovie, updateMovie } from '../../actions/movies';

const Form = ({ currentId, setCurrentId }) => {
  const [movieData, setMovieData] = useState({ Name:'',Description:'',Director:'',Cast:'',Rated:'',ReleaseDate:'',Length:'',Cover:'',Genre:'',Score:'',watchLink:''});
  const movie = useSelector((state) => (currentId ? state.movies.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (movie) setMovieData(movie);
  }, [movie]);

  const clear = () => {
    setCurrentId(0);
    setMovieData({ Name:'',Description:'',Director:'',Cast:'',Rated:'',ReleaseDate:'',Length:'',Cover:'',Genre:'',Score:'',watchLink:''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createMovie(movieData));
      clear();
    } else {
      dispatch(updateMovie(currentId, movieData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${movie.Name}"` : 'Creating a Movie'}</Typography>
        <TextField name="director" variant="outlined" label="Dirctor" fullWidth value={movieData.Director} onChange={(e) => setMovieData({ ...movieData, Director: e.target.value.split(',') })} />
        <TextField name="name" variant="outlined" label="Name" fullWidth value={movieData.Name} onChange={(e) => setMovieData({ ...movieData, Name: e.target.value })} />
        <TextField name="description" variant="outlined" label="Descripton" fullWidth multiline rows={4} value={movieData.Descripton} onChange={(e) => setMovieData({ ...movieData, Description: e.target.value })} />
        <TextField name="genre" variant="outlined" label="Genre (coma separated)" fullWidth value={movieData.Genre} onChange={(e) => setMovieData({ ...movieData, Genre: e.target.value.split('&') })} />
        <TextField name="link" variant="outlined" label="Link" fullWidth value={movieData.watchLink} onChange={(e) => setMovieData({ ...movieData, watchLink: e.target.value})} />
        <TextField name="cast" variant="outlined" label="Cast" fullWidth value={movieData.Cast} onChange={(e) => setMovieData({ ...movieData, Cast: e.target.value})} />
        <TextField name="rated" variant="outlined" label="Rated" fullWidth value={movieData.Rated} onChange={(e) => setMovieData({ ...movieData, Rated: e.target.value})} />
        {/* <TextField name="score" variant="outlined" label="Score" type="number" InputProps={{inputProps={max:100,min:0}}} label="Score" fullWidth value={movieData.Score} onChange={(e)=>setMovieData({...movieData,Score:e.target.value})}/> */}
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setMovieData({ ...movieData, Cover: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;