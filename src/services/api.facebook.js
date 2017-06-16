/* @flow */
/* eslint-disable no-undef */

import FBSDK from 'react-native-fbsdk';
const { AccessToken } = FBSDK;

export const loginFinished = (error, result) => {
  return new Promise((resolve, reject) => {
    if (error) {
      throw new Error(
        'Oops! There was a problem logging into Facebook. Try again later.'
      );
    } else if (result.isCancelled) {
      throw new Error(
        'Login was cancelled. You need to log into Facebook to start using the app.'
      );
    } else {
      AccessToken.getCurrentAccessToken()
        .then(token => {
          resolve(token.accessToken.toString());
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

export const logoutFinished = () => {
  return new Promise(resolve => {
    resolve('You were successfully logged out!');
  });
};
