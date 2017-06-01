/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import { ACCESS_TOKEN_KEY } from '../Config';

export default class Login extends Component {
  static navigatorStyle = {
    statusBarColor: '#606B74',
  	statusBarTextColorScheme: 'dark',
    statusBarBlur: true,
    navBarTextColor: '#303841',
  	navBarBackgroundColor: '#FFFFFF',
    navBarButtonColor: '#303841',
  	navBarNoBorder: true,
  	navBarSubtitleColor: '#606B74',
  	navBarTitleTextCentered: true,
  	topBarElevationShadowEnabled: true
  };

  constructor(props) {
    super(props);

    this._login = this._login.bind(this);
  }

  _login() {
    // Implement FB Login here
    // Save Access Token to Async Storage
    AsyncStorage.setItem(ACCESS_TOKEN_KEY, 'token.accessToken')
      .then(() => {
        // Go to Home
        this.props.navigator.resetTo({
          screen: 'bookie.Home',
          title: 'Bookie'
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._login}>
          <Text style={styles.text}>
            Log in to Bookie.
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '#303841'
  }
});
