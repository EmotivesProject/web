import React, { useState } from 'react';
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { extractErrorObject, extractToken } from '../utils/extractObjects';
import { createAuth } from '../auth/actions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let initialised = false;

const LogInForm = ({ onCreateAuth }) => {
  const history = useHistory();

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loadingVar, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(null);

  // If it's not initialized yet, check if an autologin token was passed
  if (!initialised) {
    const query = useQuery();
    const token = query.get('token');
    // Check was the token is set
    if (token !== null) {
      const host = process.env.REACT_APP_API_HOST;
      const base = process.env.REACT_APP_UACL_BASE_URL;
      const url = `${host}://${base}/autologin/${token}`;

      // Attempt to login from the token
      axios.post(url,
        JSON.stringify({
          username: usernameValue,
          password: passwordValue,
        }),
        { 'Content-Type': 'application/json' })
        .then((result) => {
          onCreateAuth(extractToken(result));
          history.push('/feed');
        })
        .catch((err) => {
          setErrorObject(extractErrorObject(err));
          setLoading(false);
        });
    }
    initialised = true;
  }

  // Basic submit to log in accounts from form
  const handleSubmit = (e) => {
    setErrorObject(null);
    e.preventDefault();
    setLoading(true);

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/login`;

    axios.post(url,
      JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
      { 'Content-Type': 'application/json' })
      .then((result) => {
        onCreateAuth(extractToken(result));
        history.push('/feed');
      })
      .catch((err) => {
        setErrorObject(extractErrorObject(err));
        setLoading(false);
      });
  };

  const message = errorObject ? (
    <Message
      error
      header={errorObject.target}
      content={errorObject.message}
    />
  ) : null;

  return (
    <Segment className="segment" padded="very">
      <Header as="h1" textAlign="center">
        Login
      </Header>
      <Segment padded="very">
        <Form onSubmit={handleSubmit} loading={loadingVar}>
          <label htmlFor="username">
            Username
            <Form.Input
              id="username"
              name="Username"
              type="input"
              icon="user"
              iconPosition="left"
              size="large"
              placeholder="Username"
              required
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              min="3"
              max="100"
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <Form.Input
              id="password"
              name="Password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              icon="lock"
              iconPosition="left"
              size="large"
              placeholder="Password"
              type="password"
              required
              min="6"
              max="100"
            />
          </label>
          <br />
          <Button className="typical-button">Login</Button>
        </Form>
        {message}
      </Segment>
    </Segment>
  );
};

// Create up auth dispatch to be able to set the auth
const mapDispatchToProps = (dispatch) => ({
  onCreateAuth: (auth) => dispatch(createAuth(auth)),
});

export default connect(null, mapDispatchToProps)(LogInForm);
