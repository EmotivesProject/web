import { createSelector } from 'reselect';

const getMessages = (state) => state.messengerState.messages;
const getTalkingTo = (state) => state.messengerState.talkingTo;
const getClient = (state) => state.messengerState.client;
const getUsers = (state) => state.messengerState.users;

const getActiveUsers = createSelector(
  getUsers,
  (users) => users.filter((user) => user.active),
);

const getInactiveUsers = createSelector(
  getUsers,
  (users) => users.filter((user) => !user.active),
);

export {
  getMessages,
  getTalkingTo,
  getUsers,
  getClient,
  getActiveUsers,
  getInactiveUsers,
};
