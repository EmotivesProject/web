/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import HomePage from '../home/HomePage';
import store from '../store';

export default {
  title: 'Home Page',
  component: HomePage,
};

const PageTemplate = (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <HomePage {...args} />
    </BrowserRouter>
  </Provider>
);

export const LoggedOut = PageTemplate.bind({});
LoggedOut.args = {
  auth: null,
};
