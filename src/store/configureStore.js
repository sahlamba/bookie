/* @flow */
/* eslint-disable global-require */
/* eslint-disable no-undef */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

let middleware = [thunk];

if (__DEV__) {
  const logger = createLogger();
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export default function configureStore(initialState) {
  return createStore(reducers, initialState, applyMiddleware(...middleware));
}
