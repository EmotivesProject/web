export const NEW_MESSAGE = 'NEW_MESSAGE';
export const newMessage = (message) => ({
  type: NEW_MESSAGE,
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
