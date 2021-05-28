const getMessages = (state) => state.messengerState.messages;
const getTalkingTo = (state) => state.messengerState.talkingTo;
const getUsers = (state) => state.messengerState.users;

export { getMessages, getTalkingTo, getUsers };
