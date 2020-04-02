import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
//permissions
import { askAsync, LOCATION } from 'expo-permissions';
//location
import { getCurrentPositionAsync } from 'expo-location';
//constants
import Colors from '../constants/Colors';
//components
import MapPreview from './MapPreview';

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
});

const LocationPicker = ({ navigate, getParam, onLocationPicked }) => {
  const [isFetching, setIsFetching] = useState(false),
    [pickedLocation, setPickedLocation] = useState();
  const mapPickedLocation = getParam('pickedLocation');

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await askAsync(LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  //get static map of current user location
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    setIsFetching(true);
    try {
      const {
        coords: { latitude, longitude }
      } = await getCurrentPositionAsync({
        timeout: 5000
      });
      setPickedLocation({ lat: latitude, lng: longitude });
      onLocationPicked({ lat: latitude, lng: longitude });
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
  };

  //open map to pisk a location
  const pickOnMapHandler = () => {
    navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={pickedLocation}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title="Pick on Map"
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;
