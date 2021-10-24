import React, { useState } from 'react';
import {
  Grid, Form, Button, Message,
} from 'semantic-ui-react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import randomKey from '../utils/randomKey';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_UACL_BASE_URL;
const url = `${host}://${base}/autologin`;

// Page that is used to create autologin tokens
const Autologin = ({ auth }) => {
  // Make sure the user is authenticated
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const [usernameForValue, setUsernameForValue] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [autologinTokens, setAutologinTokens] = useState([]);

  if (!initialized) {
    setInitialized(true);
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((result) => {
        const { data } = result;
        let responseResult = data ? data.result : null;
        if (responseResult === null) {
          responseResult = [];
        }
        setAutologinTokens(responseResult);
      });
  }

  // Prevent default submission and attempt to create an autologin token
  // using the input. Not handling any errors since it should only be used
  // rarely
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(url,
      JSON.stringify({
        username: usernameForValue,
      }), {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        const { data } = result;
        const responseResult = data ? data.result : null;
        setAutologinTokens([responseResult, ...autologinTokens]);
      });
  };

  // Used to submit a deletion of an autologin token. Disables a linting to
  // do a generic default alert
  const handleDelete = (e, token) => {
    e.preventDefault();

    /* eslint-disable no-alert */
    if (!window.confirm('Are you sure?')) {
      return;
    }

    const deleteURL = `${url}/${token}`;

    axios.delete(deleteURL, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then(() => {
        const currentTokens = autologinTokens.filter((aToken) => (
          aToken.autologin_token !== token
        ));
        setAutologinTokens(currentTokens);
      });
  };

  return (
    <>
      <TopBar />
      <Grid role="main" id="main">
        <Grid.Row columns="three">
          <Grid.Column />
          <Grid.Column>
            <h1>Create autologin token</h1>
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
                  value={usernameForValue}
                  onChange={(e) => setUsernameForValue(e.target.value)}
                  min="3"
                  max="100"
                />
              </label>
              <br />
              <Button id="typical-button">Create</Button>
            </Form>
            {autologinTokens.map((autologin) => (
              <Message
                key={randomKey()}
                className="autologin-message"
              >
                <Message.Header>{autologin.username}</Message.Header>
                {`${autologin.site}${autologin.autologin_token}`}
                <br />
                <Button
                  onClick={() => (navigator.clipboard.writeText(`${autologin.site}${autologin.autologin_token}`))}
                  primary
                >
                  Copy
                </Button>
                <Button
                  onClick={(e) => handleDelete(e, autologin.autologin_token)}
                  negative
                >
                  Delete
                </Button>
              </Message>
            ))}
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </>
  );
};

// Only requires the auth information and doesn't need any dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(Autologin);
