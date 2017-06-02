/* @flow */

import { Navigation } from 'react-native-navigation';

import Home from './screens/Home';
import Login from './screens/Login';

export function registerScreens() {
  Navigation.registerComponent('bookie.Home', () => Home);
  Navigation.registerComponent('bookie.Login', () => Login);
}
