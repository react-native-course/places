import React from 'react';
//redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
//navigator
import PlacesNavigator from './navigation/PlacesNavigator';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
