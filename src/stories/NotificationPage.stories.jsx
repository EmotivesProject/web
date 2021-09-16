/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import NotificationPage from '../notifications/NotificationPage';
import store from '../store';

export default {
  title: 'Notification Page',
  component: NotificationPage,
};

const PageTemplate = (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <NotificationPage {...args} />
    </BrowserRouter>
  </Provider>
);

export const DefaultNotificationPage = PageTemplate.bind({});
DefaultNotificationPage.args = {
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
};
