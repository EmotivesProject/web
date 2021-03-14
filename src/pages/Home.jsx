import React, { Component } from 'react';
import Dashboard from '../components/Dashboard';
import NotLoggedInHome from '../components/NotLoggedInHome';

class Home extends Component {
  constructor(props) {
    super(props);
    const token = this.getToken();
    this.state = {
      LoggedIn: Boolean(token),
    };
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
