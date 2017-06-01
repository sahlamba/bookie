/* @flow */

import React from 'react';

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/Screens';

registerScreens();

const navigatorStyle = {
	statusBarTextColorScheme: 'dark',
  statusBarBlur: true,
	navBarHidden: true
};

Navigation.startSingleScreenApp({
	screen: {
		screen: 'bookie.Home',
		title: 'Bookie',
		navigatorStyle
  }
});
