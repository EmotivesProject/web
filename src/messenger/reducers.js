import {
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE,
  FETCHED_MESSAGES,
  SWITCH_PERSON,
  SET_CLIENT,
  SET_USERS,
  WEBSOCKET_SEND,
  NEW_CONNECTION,
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
      return {
        ...state,
        client: null,
      };
    }
    case WEBSOCKET_MESSAGE: {
      const currentMessages = state.messages;
      currentMessages.push(payload);
      return {
        ...state,
        messages: [...currentMessages],
      };
    }
    case WEBSOCKET_SEND: {
      const { message } = payload;
      state.client.send(message);
      return state;
    }
    case FETCHED_MESSAGES: {
      let { messages } = payload;
      messages = messages !== null ? messages : [];
      const newStateMessages = messages.map(
        (fetchedMessage) => state.messages.find(
          (existingMessage) => existingMessage.id === fetchedMessage.id,
        ) || fetchedMessage,
      );

      return {
        ...state,
        messages: newStateMessages,
      };
    }
    case SWITCH_PERSON: {
      const { newPerson, oldPerson } = payload;
      const currentMessages = state.messages;
      if (oldPerson === null) {
        currentMessages.filter(
          (message) => (
            message.username_from !== oldPerson || message.username_to !== oldPerson),
        );
      }
      return {
        ...state,
        talkingTo: newPerson,
        messages: [...currentMessages],
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
    case NEW_CONNECTION: {
      const { user } = payload;
      const currentUsers = state.users;
      const foundUser = currentUsers.find((u) => u.username === user.username);
      if (foundUser) {
        foundUser.Active = user.active;
      } else {
        currentUsers.push(user);
      }
      return {
        ...state,
        users: [...currentUsers],
      };
    }
    default:
      return state;
  }
};

export default messengerState;
