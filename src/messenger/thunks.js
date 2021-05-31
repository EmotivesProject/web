import axios from 'axios';
import { w3cwebsocket as W3cwebsocket } from 'websocket';
import { removeAuth } from '../auth/actions';
import {
  webSocketOpen,
  setClient,
  webSocketClosed,
  webSocketMessage,
  setUsers,
  sendMessage,
  switchPerson,
  fetchedMessages,
  newConnection,
} from './actions';

const apiHost = process.env.REACT_APP_API_HOST;
const urlBase = process.env.REACT_APP_CHATTER_BASE_URL;
const wsBase = process.env.REACT_APP_WS_HOST;

const dispatchPersonSwitch = (newPerson, oldPerson) => async (dispatch) => {
  dispatch(switchPerson(newPerson, oldPerson));
};

const getUsersRequest = () => async (dispatch) => {
  const usersURL = `${apiHost}://${urlBase}/connections`;
  axios.get(usersURL)
    .then((result) => {
      dispatch(setUsers(result.data.result));
    })
    .catch(() => {
      dispatch(removeAuth());
      dispatch(webSocketClosed());
    });
};

const receivedNewMessage = (message) => async (dispatch) => {
  const messageObject = JSON.parse(message.data);
  if (messageObject.username === null) {
    dispatch(webSocketMessage(messageObject));
  } else {
    dispatch(newConnection(messageObject));
  }
};

const setupClient = (token) => async (dispatch) => {
  const tokenURL = `${apiHost}://${urlBase}/ws_token`;

  axios.get(tokenURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      const authToken = result.data.result.token;
      const wsURL = `${wsBase}://${urlBase}/ws?token=${authToken}`;
      const client = new W3cwebsocket(wsURL);
      dispatch(setClient(client));
      client.onopen = () => dispatch(webSocketOpen());
      client.onclose = () => dispatch(webSocketClosed());
      client.onmessage = (message) => dispatch(receivedNewMessage(message));
      dispatch(getUsersRequest());
    })
    .catch(() => {
      dispatch(removeAuth());
    });
};

const sendMessageToSocket = (message, from, to) => async (dispatch) => {
  const stringBody = JSON.stringify({
    username_from: from,
    username_to: to,
    message,
  });
  dispatch(sendMessage(stringBody));
};

const requestPreviousMessages = (token, from, to) => async (dispatch) => {
  const messagesURL = `${apiHost}://${urlBase}/messages?from=${from}&to=${to}`;

  axios.get(messagesURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      dispatch(fetchedMessages(result.data.result));
    })
    .catch(() => {
      dispatch(removeAuth());
      dispatch(webSocketClosed());
    });
};

export {
  setupClient,
  getUsersRequest,
  sendMessageToSocket,
  requestPreviousMessages,
  dispatchPersonSwitch,
};
