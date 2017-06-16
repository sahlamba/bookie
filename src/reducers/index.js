/* @flow */

import { combineReducers } from 'redux';
import fbAccessToken from './reducer.fbAccessToken';
import currentUser from './reducer.currentUser';

const reducers = combineReducers({
  fbAccessToken,
  currentUser
});

export default reducers;
