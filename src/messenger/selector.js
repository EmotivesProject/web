const getMessages = (state) => state.messengerState.messages;
const getTalkingTo = (state) => state.messengerState.talkingTo;
const getClient = (state) => state.messengerState.client;
const getUsers = (state) => state.messengerState.users;

export {
  getMessages,
  getTalkingTo,
  getUsers,
  getClient,
};
