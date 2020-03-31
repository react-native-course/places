//action types
import { ADD_PLACE } from '../actionTypes';
//file system
import * as FileSystem from 'expo-file-system';

export const addPlace = ({ title, imagePath }) => async (dispatch) => {
  //set image name
  const imageName = imagePath.split('/').pop(),
    //create new path using document directory path with the name
    newPath = FileSystem.documentDirectory + imageName;

  try {
    await FileSystem.moveAsync({
      from: imagePath,
      to: newPath
    });
    dispatch({
      type: ADD_PLACE,
      placeData: { title, imagePath: newPath }
    });
  } catch (err) {
    console.log(err);
    //you can pass it to the screen to view it there
    throw err;
  }
};
