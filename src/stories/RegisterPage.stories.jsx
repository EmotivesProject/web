/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/index.css';
import RegisterPage from '../register/RegisterPage';
import store from '../store';

export default {
  title: 'Register Page',
  component: RegisterPage,
};

const PageTemplate = (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <RegisterPage {...args} />
    </BrowserRouter>
  </Provider>
);

export const DefaultRegisterPage = PageTemplate.bind({});
DefaultRegisterPage.args = {
  auth: null,
};
