//action types
import { ADD_PLACE, SET_PLACES } from '../actionTypes';
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
          placeData: {
            id,
            title,
            imagePath,
            address,
            coords: { lat, lng }
          }
        } = action,
        newPlace = new Place(
          id.toString(),
          title,
          imagePath,
          address,
          lat,
          lng
        );
      return updateObject(state, { places: state.places.concat(newPlace) });
    }
    case SET_PLACES: {
      return updateObject(state, {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        )
      });
    }
    default:
      return state;
  }
};

export default reducer;
