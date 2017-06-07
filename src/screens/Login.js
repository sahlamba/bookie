/* @flow */

// Core
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, AsyncStorage, StyleSheet } from 'react-native';

// 3rd Party
import FBSDK from 'react-native-fbsdk';
const { LoginButton, AccessToken } = FBSDK;

// Config
import { ACCESS_TOKEN_KEY } from '../Config';
const reqdPermissions = ['email', 'public_profile'];

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

  static propTypes = {
    navigator: PropTypes.object
  };

  constructor(props) {
    super(props);

    this._login = this._login.bind(this);
    this._getAccessTokenFromFB = this._getAccessTokenFromFB.bind(this);
    this._logout = this._logout.bind(this);
  }

  _login(error, result) {
    if (error) {
      // TODO: 'Oops! There was a problem logging into Facebook. Try again later.'
    } else if (result.isCancelled) {
      // TODO: 'You need to log into Facebook to start using the app.'
    } else {
      this._getAccessTokenFromFB();
    }
  }

  _getAccessTokenFromFB() {
    AccessToken.getCurrentAccessToken()
      .then(token => {
        if (token) {
          // Save Access Token to Async Storage
          AsyncStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken.toString())
            .then(() => {
              // Go to Home
              this.props.navigator.resetTo({
                screen: 'bookie.Home',
                title: 'Bookie'
              });
            })
            .catch(err => {
              console.error(err); // eslint-disable-line
            });
        }
      })
      .catch(err => {
        console.error(err); // eslint-disable-line
      });
  }

  _logout() {
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
      .then(() => {
        // Go to Login
        this.props.navigator.resetTo({
          screen: 'bookie.Login',
          title: 'Login'
        });
        // TODO: 'You were successfully logged out!'
      })
      .catch(err => {
        console.error(err); // eslint-disable-line
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          readPermissions={reqdPermissions}
          onLoginFinished={this._login}
          onLogoutFinished={this._logout}
        />
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
