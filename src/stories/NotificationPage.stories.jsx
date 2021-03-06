/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import { NotificationPage } from '../notifications/NotificationPage';

export default {
  title: 'Notification Page',
  component: NotificationPage,
};

const PageTemplate = (args) => (
  <BrowserRouter>
    <NotificationPage {...args} />
  </BrowserRouter>
);

export const DefaultNotificationPage = PageTemplate.bind({});
DefaultNotificationPage.args = {
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
  notifications: [
    {
      id: '60ffde215306eef093060418',
      username: 'imtom',
      type: 'message',
      title: 'New message!',
      message: 'second messaged you: 🥺',
      link: 'https://localhost/messenger?talking-to=second',
      username_to: 'imtom',
      created_at: '2021-07-27T10:21:21.429Z',
      seen: false,
    },
    {
      id: '60ffde215306eef093060419',
      username: 'imtom',
      type: 'comment',
      title: 'New Comment!',
      message: 'second commented on your post',
      link: 'http://emotives.net/post/3',
      username_to: 'second',
      created_at: '2021-07-27T09:01:06.434Z',
      seen: false,
    },
    {
      id: '60ffde215306eef093060420',
      username: 'imtom',
      type: 'comment',
      title: 'New Comment!',
      message: 'second commented on your post',
      link: 'http://emotives.net/post/3',
      username_to: 'second',
      created_at: '2021-07-27T09:01:06.434Z',
      seen: false,
    },
    {
      id: '60ffde215306eef093060421',
      username: 'imtom',
      type: 'comment',
      title: 'New Comment!',
      message: 'second commented on your post',
      link: 'http://emotives.net/post/3',
      username_to: 'second',
      created_at: '2021-07-27T09:01:06.434Z',
      seen: false,
    },
    {
      id: '60ffde215306eef093060422',
      username: 'imtom',
      type: 'comment',
      title: 'New Comment!',
      message: 'second commented on your post',
      link: 'http://emotives.net/post/3',
      username_to: 'second',
      created_at: '2021-07-27T09:01:06.434Z',
      seen: false,
    },
  ],
  error: null,
  finished: false,
  loadNotifications: () => [],
  seenNotification: () => [],
  page: 5,
};
