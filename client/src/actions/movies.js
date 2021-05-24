import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

import * as api from '../apis'

export const getMovies = () => async (dispatch) => {
  try {
    const { data } = await api.getMovies();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createMovie = (post) => async (dispatch) => {
  try {
    const { data } = await api.createMovie(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMovie = (id, movie) => async (dispatch) => {
  try {
    const { data } = await api.updateMovie(id, movie);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMovie = (id) => async (dispatch) => {
  try {
    await api.deleteMovie(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};