/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import { ProfilePage } from '../profile/ProfilePage';

export default {
  title: 'ProfilePage Page',
  component: ProfilePage,
};

const PageTemplate = (args) => (
  <BrowserRouter>
    <ProfilePage {...args} />
  </BrowserRouter>
);

export const DefaultProfilePage = PageTemplate.bind({});
DefaultProfilePage.args = {
  auth: {
    username: 'test',
    token: 'fake-token',
    refresh_token: 'refreshToken',
  },
};

DefaultProfilePage.parameters = {
  axe: {
    disabledRules: ['aria-allowed-role'],
  },
};
