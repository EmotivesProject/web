import React, { useState } from 'react';
import {
  Button, Form, Header, Segment,
} from 'semantic-ui-react';

const HomeLoginForm = () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header as="h2" textAlign="center">
        Log in
      </Header>
      <Segment>
        <Form onSubmit={handleSubmit}>
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
          <Button primary> Login </Button>
        </Form>
      </Segment>
    </>
  );
};

export default HomeLoginForm;
