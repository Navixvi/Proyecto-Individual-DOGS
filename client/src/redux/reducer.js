// reducer.js
import {
  FETCH_DOGS_SUCCESS,
  SEARCH_DOGS_SUCCESS,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  SORT_BY_ALPHABETICAL,
  SORT_BY_WEIGHT,
} from './action-types';

const initialState = {
  dogBreeds: [],
  filteredDogBreeds: [], // Nuevo estado para almacenar las razas filtradas
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOGS_SUCCESS:
    case SEARCH_DOGS_SUCCESS:
      return {
        ...state,
        dogBreeds: action.payload,
        filteredDogBreeds: action.payload, // Inicialmente, ambas listas son iguales
      };
    case FILTER_BY_TEMPERAMENT:
  const filteredByTemperament = state.dogBreeds.filter((dog) =>
    dog.temperament && dog.temperament.includes(action.payload)
  );
  return {
    ...state,
    filteredDogBreeds: filteredByTemperament,
  };
    case FILTER_BY_ORIGIN:
      const filteredByOrigin = state.dogBreeds.filter((dog) =>
        dog.origin === action.payload
      );
      return {
        ...state,
        filteredDogBreeds: filteredByOrigin,
      };
    case SORT_BY_ALPHABETICAL:
      const sortedAlphabetical = [...state.filteredDogBreeds].sort((a, b) =>
        action.payload === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      return {
        ...state,
        filteredDogBreeds: sortedAlphabetical,
      };
    case SORT_BY_WEIGHT:
      const sortedByWeight = [...state.filteredDogBreeds].sort((a, b) =>
        action.payload === 'asc' ? a.weight - b.weight : b.weight - a.weight
      );
      return {
        ...state,
        filteredDogBreeds: sortedByWeight,
      };
    default:
      return state;
  }
};

export default dogReducer;
