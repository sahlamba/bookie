/* @flow */

import { Navigation } from 'react-native-navigation';

import Home from './screens/Home';

export function registerScreens() {
	Navigation.registerComponent('bookie.Home', () => Home);
}
