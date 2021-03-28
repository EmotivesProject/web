import React, { Component } from 'react';
import axios from 'axios';

import Dashboard from '../components/Dashboard';
import NotLoggedInHome from '../components/NotLoggedInHome';
import { getToken, removeToken } from '../utils/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    const token = getToken('auth');
    this.state = {
      LoggedIn: Boolean(token),
    };
  }

  componentDidMount() {
    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/authorize`;

    const token = getToken('auth');

    if (token) {
      axios.get(url, {
        headers: {
          Authorization: token,
        },
      })
        .catch(() => {
          removeToken();
          window.location.reload(false);
        });
    }
  }

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
