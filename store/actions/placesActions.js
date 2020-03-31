//action types
import { ADD_PLACE, SET_PLACES } from '../actionTypes';
//file system
import { documentDirectory, moveAsync } from 'expo-file-system';
//sqlite DB methods
import { insertPlace, fetchPlaces } from '../../helpers/db';

export const addPlace = ({ title, imagePath }) => async (dispatch) => {
  //set image name
  const imageName = imagePath.split('/').pop(),
    //create new path using document directory path with the name
    newPath = documentDirectory + imageName;

  try {
    await moveAsync({
      from: imagePath,
      to: newPath
    });
    const { insertId } = await insertPlace({
      title,
      imageUri: newPath,
      address: 'Dummy address',
      lat: 15.6,
      lng: 12.3
    });
    dispatch({
      type: ADD_PLACE,
      placeData: { id: insertId, title, imagePath: newPath }
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
