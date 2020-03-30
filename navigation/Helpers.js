import React from 'react';
//react native
import { Platform } from 'react-native';
//icons
import { Ionicons } from '@expo/vector-icons';
//header buttons
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
//components
import CustomHeaderButton from '../components/UI/CustomHeaderButton';

//header button icon
export const headerButtonIcon = ({ onPressHandler, icon, buttonTitle }) => (
  <HeaderButtons
    HeaderButtonComponent={CustomHeaderButton}
    title={`${buttonTitle} content`}
  >
    <Item
      title={buttonTitle}
      label={buttonTitle}
      iconName={Platform.OS === 'android' ? `md-${icon}` : `ios-${icon}`}
      onPress={() => onPressHandler()}
    />
  </HeaderButtons>
);

//icon for the drawer label
export const setDrawerIcon = ({ drawerConfig, iconName }) => (
  <Ionicons
    name={Platform.OS === 'android' ? `md-${iconName}` : `ios-${iconName}`}
    size={23}
    color={drawerConfig.tintColor}
  />
);
