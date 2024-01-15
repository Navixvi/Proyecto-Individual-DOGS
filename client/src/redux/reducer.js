import { FETCH_DOGS_SUCCESS, SEARCH_DOGS_SUCCESS } from './action-type';

const initialState = {
  dogBreeds: [],
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOGS_SUCCESS:
    case SEARCH_DOGS_SUCCESS:
      return {
        ...state,
        dogBreeds: action.payload,
      };
    default:
      return state;
  }
};

export default dogReducer;
