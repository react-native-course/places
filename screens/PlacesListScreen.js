import React from 'react';
//react redux
import { useSelector } from 'react-redux';
//react native
import { FlatList, StyleSheet } from 'react-native';
//selectors
import { getPlaces } from '../store/selectors/placesSelectors';
//components
import PlaceItem from '../components/PlaceItem';

const styles = StyleSheet.create({});

const PlacesListScreen = ({ navigation: { navigate } }) => {
  const places = useSelector((state) => getPlaces({ state }));
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        const {
          item: { title, id, imageUri }
        } = itemData;
        return (
          <PlaceItem
            onSelect={() =>
              navigate('PlaceDetail', { placeTitle: title, placeId: id })
            }
            image={imageUri}
            title={title}
            address=""
          />
        );
      }}
    />
  );
};

export default PlacesListScreen;
