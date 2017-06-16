/* @flow */

import { AsyncStorage } from 'react-native';

import { loginFinished, logoutFinished } from '../services/api.facebook';

import { ACCESS_TOKEN_KEY } from '../config';
import * as types from './types';

export const setFacebookToken = fbAccessToken => {
  return {
    type: types.SET_FACEBOOK_TOKEN,
    fbAccessToken
  };
};

export const setFacebookTokenAsync = () => {
  return dispatch => {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY)
      .then(token => {
        dispatch(setFacebookToken(token));
      })
      .catch(err => {
        console.error(err); // eslint-disable-line
      });
  };
};

export const facebookLogin = (error, result) => {
  return dispatch => {
    return loginFinished(error, result)
      .then(token => {
        return AsyncStorage.setItem(ACCESS_TOKEN_KEY, token)
          .then(() => {
            dispatch(setFacebookToken(token));
          })
          .catch(err => {
            console.error(err); // eslint-disable-line
          });
      })
      .catch(err => {
        console.error(err); // eslint-disable-line
      });
  };
};

export const facbookLogout = () => {
  return dispatch => {
    return logoutFinished()
      .then(() => {
        AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
          .then(() => {
            dispatch(setFacebookToken(undefined));
          })
          .catch(err => {
            console.error(err); // eslint-disable-line
          });
      })
      .catch(err => {
        console.error(err); // eslint-disable-line
      });
  };
};
