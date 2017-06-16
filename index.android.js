/* @flow */
/* eslint-disable no-unused-vars */

// Core
import React from 'react';
import { Provider } from 'react-redux';

// Navigation
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

// Store
import configureStore from './src/store/configureStore';
const store = configureStore();

registerScreens(store, Provider);

// Common Navigator Styles
const navigatorStyle = {
  statusBarColor: '#606B74',
  statusBarTextColorScheme: 'dark',
  statusBarBlur: true,
  navBarTextColor: '#303841',
  navBarBackgroundColor: '#FFFFFF',
  navBarButtonColor: '#303841'
};

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: 'bookie.Home',
    title: 'Bookie',
    navigatorStyle
  }
});
