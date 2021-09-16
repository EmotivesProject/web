/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import LogInPage from '../logIn/LogInPage';
import store from '../store';

export default {
  title: 'Log In Page',
  component: LogInPage,
};

const PageTemplate = (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <LogInPage {...args} />
    </BrowserRouter>
  </Provider>
);

export const DefaultLogInPage = PageTemplate.bind({});
DefaultLogInPage.args = {
  auth: null,
};
