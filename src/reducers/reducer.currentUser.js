/* @flow */

import * as types from '../actions/types';
import initialState from '../store/initialState';

export default function(state = initialState.currentUser, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
}
