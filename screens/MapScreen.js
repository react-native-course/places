import React, { useState, useEffect, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
//react-native-maps
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

const MapScreen = ({ navigation: { setParams, navigate } }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  let markerCoordinates;

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('Location error', 'Please select a location on the map.', [
        { text: 'Okay' }
      ]);
      return;
    }
    navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;
