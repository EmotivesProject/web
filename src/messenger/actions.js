export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN';
export const webSocketOpen = () => ({
  type: WEBSOCKET_OPEN,
});

export const WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED';
export const webSocketClosed = () => ({
  type: WEBSOCKET_CLOSED,
});

export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const webSocketMessage = (content) => ({
  type: WEBSOCKET_MESSAGE,
  payload: content,
});

export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
export const sendMessage = (message) => ({
  type: WEBSOCKET_SEND,
  payload: { message },
});

export const FETCHED_MESSAGES = 'FETCHED_MESSAGES';
export const fetchedMessages = (messages) => ({
  type: FETCHED_MESSAGES,
  payload: { messages },
});

export const SWITCH_PERSON = 'SWITCH_PERSON';
export const switchPerson = (person) => ({
  type: SWITCH_PERSON,
  payload: { person },
});

export const SET_CLIENT = 'SET_CLIENT';
export const setClient = (client) => ({
  type: SET_CLIENT,
  payload: { client },
});

export const SET_USERS = 'SET_USERS';
export const setUsers = (users) => ({
  type: SET_USERS,
  payload: { users },
});
