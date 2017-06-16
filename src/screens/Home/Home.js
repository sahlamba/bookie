/* @flow */

// Core
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions Creators
import * as actionsFbAccessToken from '../../actions/actions.fbAccessToken';
import * as actionsCurrentUser from '../../actions/actions.currentUser';

// Components & Services
import Loader from '../../components/Loader/Loader';

// Styles
import styles from './styles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this._getFBAccessToken = this._getFBAccessToken.bind(this);
    this._getCurrentUser = this._getCurrentUser.bind(this);
  }

  componentDidMount() {
    if (this.props.fbAccessToken) this._getCurrentUser();
    else this._getFBAccessToken();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fbAccessToken) {
      this._getCurrentUser();
      if (Object.keys(nextProps.currentUser)) {
        this.setState({
          isLoading: false
        });
        this.props.navigator.setStyle({
          navBarHidden: false
        });
      }
    } else {
      this.props.navigator.resetTo({
        screen: 'bookie.Login',
        title: 'Login'
      });
    }
  }

  _getFBAccessToken = () => {
    this.props.actionsFbAccessToken.setFacebookTokenAsync();
  };

  _getCurrentUser = () => {
    this.props.actionsCurrentUser.getCurrentUser(this.props.fbAccessToken);
  };

  render() {
    return this.state.isLoading
      ? <Loader />
      : <View style={styles.container}>
          <Text style={styles.text}>
            {this.props.currentUser.name}
          </Text>
          <TouchableHighlight onPress={() => {}}>
            <Text style={styles.text}>
              Log Out.
            </Text>
          </TouchableHighlight>
        </View>;
  }
}

Home.navigatorStyle = {
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

Home.propTypes = {
  navigator: PropTypes.object,
  fbAccessToken: PropTypes.any,
  currentUser: PropTypes.object,
  actionsFbAccessToken: PropTypes.object,
  actionsCurrentUser: PropTypes.object
};

const mapStateToProps = state => {
  return {
    fbAccessToken: state.fbAccessToken,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionsFbAccessToken: bindActionCreators(actionsFbAccessToken, dispatch),
    actionsCurrentUser: bindActionCreators(actionsCurrentUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
