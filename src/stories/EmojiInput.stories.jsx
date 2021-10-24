/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import EmojiInput from '../shared/EmojiInput';
import store from '../store';

export default {
  title: 'Emoji Input',
  component: EmojiInput,
};

const ComponentTemplate = (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <EmojiInput {...args} />
    </BrowserRouter>
  </Provider>
);

export const DefaultEmojiInput = ComponentTemplate.bind({});
DefaultEmojiInput.args = {
  buttonText: 'test text',
  header: 'Send a test',
  type: 'messenger',
  action: () => [],
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
  postID: 1,
  from: 'test',
  to: 'james',
  subComponentID: 'meesenger',
};

export const OpenEmojiInput = ComponentTemplate.bind({});
OpenEmojiInput.args = {
  buttonText: 'test text',
  header: 'Send a test',
  type: 'messenger',
  action: () => [],
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
  postID: 1,
  from: 'test',
  to: 'james',
  subComponentID: 'meesenger',
  initialOpen: true,
};

OpenEmojiInput.parameters = {
  axe: {
    skip: true,
  },
};
