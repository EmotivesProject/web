import {
  CREATE_AUTH,
  UPDATE_AUTH,
  REMOVE_AUTH,
} from './actions';

const initialState = {};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_AUTH: {
      const { auth } = payload;
      return {
        auth,
      };
    }
    case UPDATE_AUTH: {
      const { auth } = payload;
      return {
        auth,
      };
    }
    case REMOVE_AUTH: {
      return {};
    }
    default:
      return state;
  }
};

export default authReducer;
