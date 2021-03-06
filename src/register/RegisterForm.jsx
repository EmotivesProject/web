import { React, useState } from 'react';
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { extractErrorObject, extractToken } from '../utils/extractObjects';
import { createAuth } from '../auth/actions';

// Basic component register form
const RegisterForm = ({ onCreateAuth }) => {
  const history = useHistory();

  // Setup the states and setters
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [secretValue, setSecretValue] = useState('');
  const [groupValue, setGroupValue] = useState('qut');
  const [loadingVar, setLoading] = useState(false);
  const [errorObject, setErrorObject] = useState(null);

  // handle the submit here instead of a reducer since it's not that complex
  // Handle errors since error strings here might be useful.
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
        user_group: groupValue,
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

  // Create an error component if the error is set
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
          <label htmlFor="group">
            Group
            <Form.Input
              id="group"
              name="Group"
              value={groupValue}
              onChange={(e) => setGroupValue(e.target.value)}
              icon="group"
              iconPosition="left"
              size="large"
              placeholder="Secret"
              required
              min="1"
              max="100"
            />
          </label>
          <br />
          <Button size="large" className="typical-button">
            Register now
          </Button>
        </Segment>
      </Form>
      {message}
    </Segment>
  );
};

// Only requires aa dispatch to create authentication
const mapDispatchToProps = (dispatch) => ({
  onCreateAuth: (auth) => dispatch(createAuth(auth)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
