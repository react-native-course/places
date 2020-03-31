import React from 'react';
//redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
//sqlite DB configurations
import { init } from './helpers/db';
//navigator
import PlacesNavigator from './navigation/PlacesNavigator';

init()
  .then(() => console.log('Initialized DB'))
  .catch((err) => console.log('Initializeing DB failed ', err));

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
