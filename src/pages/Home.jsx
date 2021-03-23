import React, { Component } from 'react';
import axios from 'axios';

import Dashboard from '../components/Dashboard';
import NotLoggedInHome from '../components/NotLoggedInHome';
import { RemoveToken } from '../utils/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    const token = this.getToken();
    this.state = {
      LoggedIn: Boolean(token),
    };
  }

  componentDidMount() {
    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/authorize`;

    const token = this.getToken();

    if (token) {
      axios.get(url, {
        headers: {
          Authorization: token,
        },
      })
        .catch(() => {
          RemoveToken();
          window.location.reload(false);
        });
    }
  }

  getToken = () => {
    const tokenString = localStorage.getItem('auth');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  render() {
    const { LoggedIn } = this.state;
    return (
      <div>
        {LoggedIn ? (
          <Dashboard />
        ) : (
          <NotLoggedInHome />
        )}
      </div>
    );
  }
}

export default Home;
