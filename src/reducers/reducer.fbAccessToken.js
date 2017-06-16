/* @flow */

import * as types from '../actions/types';
import initialState from '../store/initialState';

export default function(state = initialState.fbAccessToken, action) {
  switch (action.type) {
    case types.SET_FACEBOOK_TOKEN:
      return action.fbAccessToken;
    default:
      return state;
  }
}
