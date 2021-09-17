/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import { MessengerPage } from '../messenger/MessengerPage';

export default {
  title: 'Messenger Page',
  component: MessengerPage,
};

const PageTemplate = (args) => (
  <BrowserRouter>
    <MessengerPage {...args} />
  </BrowserRouter>
);

export const DefaultNotificationPage = PageTemplate.bind({});
DefaultNotificationPage.args = {
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
  setupClientDispatch: () => [],
  client: null,
  sendNewMessage: () => [],
  activeUsers: [{
    username: 'activeUser',
    active: true,
  }],
  inactiveUsers: [{
    username: 'inactiveUser',
    active: false,
  }],
  talkingTo: 'James',
  getPreviousMessages: () => [],
  messages: [{
    created: '2021-07-17T03:09:31.099Z',
    id: 'testID',
    message: 'fakeMessage',
    username_from: 'test',
    username_to: 'James',
  }, {
    created: '2021-07-17T03:09:31.099Z',
    id: 'testID2',
    message: 'fakeMessage2',
    username_from: 'test',
    username_to: 'James',
  }, {
    created: '2021-07-17T03:09:31.099Z',
    id: 'testID3',
    message: 'fakeMessage3',
    username_from: 'James',
    username_to: 'test',
  },
  ],
  switchPersonTalking: () => [],
  errors: null,
};
