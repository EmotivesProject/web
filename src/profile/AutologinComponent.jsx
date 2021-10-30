import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid, Message, Segment,
} from 'semantic-ui-react';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_UACL_BASE_URL;
const lastestURL = `${host}://${base}/autologin/latest`;
const createUrl = `${host}://${base}/autologin`;

export const AutologinComponent = ({ auth, setError }) => {
  const [initialized, setInitialized] = useState(false);
  const [autologinToken, setAutologinToken] = useState(undefined);
  const [createdMessage, setCreatedMessage] = useState('');
  const [loading, setLoading] = useState(true);

  if (!initialized) {
    setInitialized(true);
    axios.get(lastestURL, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((result) => {
        const { data } = result;
        setLoading(false);
        let responseResult = data ? data.result : undefined;
        if (responseResult === null) {
          responseResult = undefined;
        }
        setAutologinToken(responseResult);
      }).catch(() => {
        setLoading(false);
        setError('error occurred, try refreshing');
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(createUrl,
      JSON.stringify({
        username: auth.username,
      }), {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((result) => {
        const { data } = result;
        const responseResult = data ? data.result : null;
        setLoading(false);
        setAutologinToken(responseResult);
        setCreatedMessage('Autologin created. Click to view');
      }).catch(() => {
        setLoading(false);
        setError('error occurred, try refreshing');
      });
  };

  const autologinButtons = autologinToken ? (
    <div>
      <Link to={`/autologin_view/${autologinToken.id}`} aria-label="Notification" tabIndex="0">
        <Button
          className="typical-button"
          content="View QR Code"
          loading={loading}
          disabled={loading}
        />
      </Link>
    </div>
  ) : (
    <div>
      <Button
        className="typical-button"
        content="Create QR Code"
        onClick={(e) => handleSubmit(e)}
        loading={loading}
        disabled={loading}
      />
    </div>
  );

  const messageDiv = createdMessage ? (
    <Message positive>
      <Message.Header>Autologin created! Click to view</Message.Header>
    </Message>
  ) : null;

  return (
    <Segment>
      <h2>
        Autologins
      </h2>
      {messageDiv}
      <Grid columns={3} textAlign="center">
        <Grid.Column />
        <Grid.Column>
          {autologinButtons}
        </Grid.Column>
        <Grid.Column />
      </Grid>
    </Segment>
  );
};

export default AutologinComponent;
