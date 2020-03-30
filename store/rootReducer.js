import { combineReducers } from 'redux';
//reducers
import placesReducer from './reducers/placesReducer';

const rootReducer = combineReducers({ placesReducer });

export default rootReducer;
