//action types
import { ADD_PLACE } from '../actionTypes';
//models
import Place from '../../models/place';
//utilities
import { updateObject } from '../utility';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const {
          placeData: { title }
        } = action,
        newPlace = new Place(new Date().toString(), title);
      return updateObject(state, { places: state.places.concat(newPlace) });
    }
    default:
      return state;
  }
};

export default reducer;
