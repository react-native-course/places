import { ADD_PLACE } from '../actionTypes';

export const addPlace = (title) => ({
  type: ADD_PLACE,
  placeData: { title }
});
