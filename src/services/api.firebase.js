/* @flow */
/* eslint-disable no-undef */

import firebase from './firebase';
const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;

export const signInWithFacebook = accessToken => {
  return new Promise((resolve, reject) => {
    let currentUser = {};
    const credential = provider.credential(accessToken);
    auth
      .signInWithCredential(credential)
      .then(isConnected => {
        if (isConnected) {
          currentUser.name = auth.currentUser.displayName;
          currentUser.email = auth.currentUser.email;
          currentUser.photoUrl = auth.currentUser.photoURL;
          currentUser.uid = auth.currentUser.uid;
          resolve(currentUser);
        } else {
          throw new Error('Could not connect to Firebase.');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};
