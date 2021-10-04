/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../assets/index.css';
import EmojiInput from '../shared/EmojiInput';

export default {
  title: 'Emoji Input',
  component: EmojiInput,
  axe: {
    skip: true,
  },
};

const ComponentTemplate = (args) => (
  <EmojiInput {...args} />
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
  axe: {
    skip: true,
  },
};
