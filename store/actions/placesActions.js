//action types
import { ADD_PLACE, SET_PLACES } from '../actionTypes';
//axios
import axios from 'axios';
//file system
import { documentDirectory, moveAsync } from 'expo-file-system';
//sqlite DB methods
import { insertPlace, fetchPlaces } from '../../helpers/db';
//env
import env from '../../env';

export const addPlace = ({ title, imagePath, location }) => async (
  dispatch
) => {
  //set image name
  const imageName = imagePath.split('/').pop(),
    //create new path using document directory path with the name
    newPath = documentDirectory + imageName;

  try {
    const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${env.googleApiKey}`
      ),
      address = res.data.results[0].formatted_address;
    await moveAsync({
      from: imagePath,
      to: newPath
    });
    const { insertId } = await insertPlace({
      title,
      imageUri: newPath,
      address,
      lat: location.lat,
      lng: location.lng
    });
    dispatch({
      type: ADD_PLACE,
      placeData: {
        id: insertId,
        title,
        imagePath: newPath,
        address,
        coords: {
          lat: location.lat,
          lng: location.lng
        }
      }
    });
  } catch (err) {
    console.log(err);
    //you can pass it to the screen to view it there
    throw err;
  }
};

export const loadPlaces = () => async (dispatch) => {
  try {
    const {
      rows: { _array }
    } = await fetchPlaces();
    dispatch({ type: SET_PLACES, places: _array });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
