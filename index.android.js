/* @flow */

import React from 'react';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/Screens';

registerScreens();

const navigatorStyle = {
	statusBarColor: '#606B74',
	statusBarTextColorScheme: 'dark',
  statusBarBlur: true,
	navBarHidden: true,
	navBarTextColor: '#303841',
	navBarBackgroundColor: '#FFFFFF',
	navBarButtonColor: '#303841'
};

Navigation.startSingleScreenApp({
	screen: {
		screen: 'bookie.Home',
		title: 'Bookie',
		navigatorStyle
  }
});
