import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authState from './auth/reducers';
import postState from './feed/reducers';
import messengerState from './messenger/reducers';
import notificationState from './notifications/reducers';

const reducers = {
  authState,
  postState,
  messengerState,
  notificationState,
};

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
