/* @flow */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import App from './src/App';

export default class bookie extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('bookie', () => bookie);
