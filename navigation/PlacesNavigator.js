import React from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
//react navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//constants
import Colors from '../constants/Colors';
//helpers
import { headerButtonIcon } from './Helpers';
//screens
import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';

const PlacesNavigator = createStackNavigator(
  {
    Places: {
      screen: PlacesListScreen,
      navigationOptions: ({ navigation: { navigate } }) => ({
        title: 'All Places',
        headerRight: () =>
          headerButtonIcon({
            onPressHandler: () => navigate('NewPlace'),
            icon: 'add',
            buttonTitle: 'Add'
          })
      })
    },
    PlaceDetail: {
      screen: PlaceDetailScreen,
      navigationOptions: ({ navigation: { getParam } }) => ({
        title: getParam('placeTitle')
      })
    },
    NewPlace: {
      screen: NewPlaceScreen,
      navigationOptions: {
        title: 'Add Place'
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation: { getParam } }) => ({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginHorizontal: 20 }}
            onPress={getParam('saveLocation')}
          >
            <Text
              style={{
                fontSize: 16,
                color: Platform.OS === 'android' ? 'white' : Colors.primary
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        )
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
  }
);

export default createAppContainer(PlacesNavigator);
