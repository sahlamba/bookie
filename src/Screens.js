/* @flow */

import { Navigation } from 'react-native-navigation';

import Home from './screens/Home/Home';
import Login from './screens/Login/Login';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('bookie.Home', () => Home, store, Provider);
  Navigation.registerComponent('bookie.Login', () => Login, store, Provider);
}
