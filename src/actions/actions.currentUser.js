/* @flow */

import { signInWithFacebook } from '../services/api.firebase';

import * as types from './types';

export const setCurrentUser = currentUser => {
  return {
    type: types.SET_CURRENT_USER,
    currentUser
  };
};

export const getCurrentUser = token => {
  return dispatch => {
    return signInWithFacebook(token)
      .then(currentUser => {
        dispatch(setCurrentUser(currentUser));
      })
      .catch(err => {
        dispatch(setCurrentUser({}));
        console.error(err); // eslint-disable-line
      });
  };
};
