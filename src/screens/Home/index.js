/* @flow */

// Core
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Text,
  NetInfo,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet
} from 'react-native';

// Components
import Loader from '../../components/Loader';

// Config
import { ACCESS_TOKEN_KEY } from '../../Config';

export default class Home extends Component {
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

    this.state = {
      checkingAuth: true
    };

    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    // Check for active net connection
    const _this = this;
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        AsyncStorage.getItem(ACCESS_TOKEN_KEY)
          .then(token => {
            if (token) {
              // TODO: Sign in to Firebase and load Home content here
              _this.setState({ checkingAuth: false });
              _this.props.navigator.setStyle({
                navBarHidden: false
              });
            } else {
              // Redirect to Login
              this.props.navigator.resetTo({
                screen: 'bookie.Login',
                title: 'Login'
              });
            }
          })
          .catch(err => {
            console.error(err); // eslint-disable-line
          });
      } else {
        // TODO: Show Net Disconnected Warning
      }
    });
  }

  _logout() {
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
      .then(() => {
        this.props.navigator.resetTo({
          screen: 'bookie.Login',
          title: 'Login'
        });
        // TODO: Display successfully logged out alert here
      })
      .catch(err => {
        console.error(err); // eslint-disable-line
      });
  }

  render() {
    if (this.state.checkingAuth) {
      return <Loader />;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            Feed Comes Here
          </Text>
          <TouchableHighlight onPress={this._logout}>
            <Text style={styles.text}>
              Log Out.
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontSize: 14,
    color: '#303841'
  }
});
