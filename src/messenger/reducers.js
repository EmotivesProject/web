import {
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE,
  FETCHED_MESSAGES,
  SWITCH_PERSON,
  SET_CLIENT,
  SET_USERS,
  WEBSOCKET_SEND,
} from './actions';

const initialState = {
  messages: [],
  users: [],
  talkingTo: '',
  client: null,
};

const messengerState = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case WEBSOCKET_OPEN: {
      return state;
    }
    case WEBSOCKET_CLOSED: {
      if (state.client !== null) {
        state.client.close();
      }
      console.log('client closing');
      return {
        ...state,
        client: null,
      };
    }
    case WEBSOCKET_MESSAGE: {
      return state;
    }
    case WEBSOCKET_SEND: {
      const { message } = payload;
      state.client.send(message);
      return state;
    }
    case FETCHED_MESSAGES: {
      return state;
    }
    case SWITCH_PERSON: {
      const { person } = payload;
      return {
        ...state,
        talkingTo: person,
      };
    }
    case SET_CLIENT: {
      const { client } = payload;
      return {
        ...state,
        client,
      };
    }
    case SET_USERS: {
      const { users } = payload;
      return {
        ...state,
        users: [...users],
      };
    }
    default:
      return state;
  }
};

export default messengerState;
