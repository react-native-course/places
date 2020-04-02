import React, { useState } from 'react';
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
  }
});

const LocationPicker = () => {
  const [isFetching, setIsFetching] = useState(false),
    [pickedLocation, setPickedLocation] = useState();

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

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPicker;
