import axios from 'axios';
import {
  FETCH_DOGS_SUCCESS,
  SEARCH_DOGS_SUCCESS,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_BY_ALPHABETICAL,
  SORT_BY_WEIGHT,
} from './action-types';

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
export const filterByTemperament = (temperament) => ({
  type: FILTER_BY_TEMPERAMENT,
  payload: temperament,
});

export const filterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: origin,
});

export const sortByAlphabetical = (order) => ({
  type: SORT_BY_ALPHABETICAL,
  payload: order,
});

export const sortByWeight = (order) => ({
  type: SORT_BY_WEIGHT,
  payload: order,
});
