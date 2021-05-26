import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducers';

const reducers = {
  authReducer,
};

const rootReducer = combineReducers(reducers);

export default createStore(rootReducer);
