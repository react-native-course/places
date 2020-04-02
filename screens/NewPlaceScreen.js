import React, { useState } from 'react';
//react redux
import { useDispatch } from 'react-redux';
//react native
import {
  View,
  ScrollView,
  Button,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Colors from '../constants/Colors';
//actions
import { addPlace } from '../store/actions/placesActions';
//components
import ImagePicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

const NewPlaceScreen = ({ navigation: { goBack, navigate, getParam } }) => {
  const [titleValue, setTitleValue] = useState(''),
    [selectedImage, setSelectedImage] = useState(),
    dispatch = useDispatch();

  const savePlaceHanlder = () => {
    dispatch(addPlace({ title: titleValue, imagePath: selectedImage }));
    goBack();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={titleValue}
          onChangeText={setTitleValue}
          style={styles.textInput}
        />
        <ImagePicker onImageTaken={setSelectedImage} />
        <LocationPicker navigate={navigate} getParam={getParam} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHanlder}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;
