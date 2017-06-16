/* @flow */

// Core
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// 3rd Party
import FBSDK from 'react-native-fbsdk';
const { LoginButton } = FBSDK;

// Action Creators
import * as actionFbAccessToken from '../../actions/actions.fbAccessToken';

// Styles
import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this._onLoginFinished = this._onLoginFinished.bind(this);
    this._onLogoutFinished = this._onLogoutFinished.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fbAccessToken) {
      this.props.navigator.resetTo({
        screen: 'bookie.Home',
        title: 'Bookie'
      });
    }
  }

  _onLoginFinished = (error, result) => {
    this.props.actionFbAccessToken.facebookLogin(error, result);
  };

  _onLogoutFinished = () => {
    this.props.actionFbAccessToken.facebookLogout();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Bookie
        </Text>
        <LoginButton
          readPermissions={['email', 'public_profile']}
          onLoginFinished={this._onLoginFinished}
          onLogoutFinished={this._onLogoutFinished}
        />
      </View>
    );
  }
}

Login.navigatorStyle = {
  statusBarColor: '#606B74',
  statusBarTextColorScheme: 'dark',
  statusBarBlur: true,
  navBarHidden: true,
  navBarTextColor: '#303841',
  navBarBackgroundColor: '#FFFFFF',
  navBarButtonColor: '#303841',
  navBarNoBorder: true,
  navBarSubtitleColor: '#606B74',
  navBarTitleTextCentered: true,
  topBarElevationShadowEnabled: true
};

Login.propTypes = {
  navigator: PropTypes.object,
  fbAccessToken: PropTypes.any,
  actionFbAccessToken: PropTypes.object
};

const mapStateToProps = state => {
  return {
    fbAccessToken: state.fbAccessToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionFbAccessToken: bindActionCreators(actionFbAccessToken, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
