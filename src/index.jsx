import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import './assets/index.css';
import interceptor from './utils/interceptors';
import RefreshToken from './utils/RefreshToken';

const fiveMinutes = 300000;

interceptor(store);

RefreshToken(store);

setInterval(() => {
  RefreshToken(store);
}, fiveMinutes);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
