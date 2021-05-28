import {
  NEW_MESSAGE,
  FETCHED_MESSAGES,
  SWITCH_PERSON,
  SET_CLIENT,
  SET_USERS,
} from './actions';

const initialState = {
  messages: [],
  users: [],
  talkingTo: '',
  client: null,
};

const messengerState = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case NEW_MESSAGE: {
      return state;
    }
    case FETCHED_MESSAGES: {
      return state;
    }
    case SWITCH_PERSON: {
      return state;
    }
    case SET_CLIENT: {
      return state;
    }
    case SET_USERS: {
      return state;
    }
    default:
      return state;
  }
};

export default messengerState;
