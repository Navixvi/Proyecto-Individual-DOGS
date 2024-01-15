import axios from 'axios';
import { FETCH_DOGS_SUCCESS, SEARCH_DOGS_SUCCESS } from './action-type';

export const fetchDogsSuccess = (dogs) => ({
  type: FETCH_DOGS_SUCCESS,
  payload: dogs,
});

export const searchDogsSuccess = (dogs) => ({
  type: SEARCH_DOGS_SUCCESS,
  payload: dogs,
});

export const fetchAllDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/dogs');
      dispatch(fetchDogsSuccess(response.data));
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };
};

export const searchDogsByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/name/${name}`);
      dispatch(searchDogsSuccess(response.data));
    } catch (error) {
      console.error('Error searching dogs:', error);
    }
  };
};
