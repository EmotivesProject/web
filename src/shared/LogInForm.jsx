import React, { useState } from 'react';
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { extractErrorObject, extractToken } from '../utils/extractObjects';
import { createAuth } from '../auth/actions';

const LogInForm = ({ onCreateAuth }) => {
  const history = useHistory();
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loadingVar, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(null);

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
    <Segment className="segment">
      <Header as="h2" textAlign="center">
        Log in
      </Header>
      <Segment>
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
          <Button primary> Log in </Button>
        </Form>
        {message}
      </Segment>
    </Segment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onCreateAuth: (auth) => dispatch(createAuth(auth)),
});

export default connect(null, mapDispatchToProps)(LogInForm);
