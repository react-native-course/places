import React, { useEffect } from 'react';
//react redux
import { useSelector, useDispatch } from 'react-redux';
//react native
import { FlatList } from 'react-native';
//selectors
import { getPlaces } from '../store/selectors/placesSelectors';
//actions
import { loadPlaces } from '../store/actions/placesActions';
//components
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = ({ navigation: { navigate } }) => {
  const places = useSelector((state) => getPlaces({ state })),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

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
