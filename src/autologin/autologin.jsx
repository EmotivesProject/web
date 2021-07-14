import React, { useState } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';

const autologin = ({ auth }) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const [usernameForValue, setUsernameForValue] = useState('');
  const [createdToken, setCreatedToken] = useState(null);

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

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(autologin);
