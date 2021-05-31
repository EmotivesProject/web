import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authState from './auth/reducers';
import postState from './feed/reducers';
import messengerState from './messenger/reducers';

const reducers = {
  authState,
  postState,
  messengerState,
};

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer, applyMiddleware(thunk));
