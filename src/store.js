import { createStore, combineReducers } from 'redux';
import authState from './auth/reducers';

const reducers = {
  authState,
};

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer);
