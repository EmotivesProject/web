import React, { useState } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';

// Page that is used to create autologin tokens
const Autologin = ({ auth }) => {
  // Make sure the user is authenticated
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const [usernameForValue, setUsernameForValue] = useState('');
  const [createdToken, setCreatedToken] = useState(null);

  // Prevent default submission and attempt to create an autologin token
  // using the input. Not handling any errors since it should only be used
  // rarely
  const handleSubmit = (e) => {
    e.preventDefault();

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/autologin`;

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
        const autologinURL = `${responseResult.site}${responseResult.autologin_token}`;
        setCreatedToken(autologinURL);
      });
  };

  // If the createdToken is set then display it.
  const resultDiv = createdToken !== null ? (
    <div>
      <h2>
        Created token is:
      </h2>
      <h4>
        {createdToken}
      </h4>
    </div>
  ) : null;

  return (
    <div>
      <TopBar />
      <Grid>
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
            {resultDiv}
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </div>
  );
};

// Only requires the auth information and doesn't need any dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(Autologin);
