import { React, useState } from 'react';
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { extractErrorObject, extractToken } from '../utils/extractObjects';
import { createAuth } from '../auth/actions';

const RegisterForm = ({ onCreateAuth }) => {
  const history = useHistory();
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [secretValue, setSecretValue] = useState('');
  const [loadingVar, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(null);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setErrorObject(null);

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/user`;

    axios.post(url,
      JSON.stringify({
        username: usernameValue,
        name: nameValue,
        password: passwordValue,
        secret: secretValue,
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
    <Segment padded="very">
      <Header as="h1" textAlign="center">
        Create an account
      </Header>
      <Form size="large" onSubmit={handleSubmit} loading={loadingVar}>
        <Segment padded="very">
          <label htmlFor="name">
            Full name
            <Form.Input
              id="name"
              name="Name"
              type="input"
              icon="user"
              iconPosition="left"
              size="large"
              placeholder="Your full name"
              required
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              min="3"
              max="100"
            />
          </label>
          <br />
          <label htmlFor="username">
            Username
            <Form.Input
              id="username"
              name="Username"
              type="username"
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
          <label htmlFor="secret">
            Secret
            <Form.Input
              id="secret"
              name="Secret"
              value={secretValue}
              onChange={(e) => setSecretValue(e.target.value)}
              icon="lock"
              iconPosition="left"
              size="large"
              placeholder="Secret"
              type="password"
              required
              min="6"
              max="100"
            />
          </label>
          <br />
          <Button size="large" id="register-button">
            Register now
          </Button>
        </Segment>
      </Form>
      {message}
    </Segment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onCreateAuth: (auth) => dispatch(createAuth(auth)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
