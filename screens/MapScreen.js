import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//map view
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

const MapScreen = () => {
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  return <MapView style={styles.map} region={mapRegion} />;
};

export default MapScreen;
