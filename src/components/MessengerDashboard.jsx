import React, { Component } from 'react';
import axios from 'axios';

import {
  Header, Grid,
} from 'semantic-ui-react';
import { w3cwebsocket as W3cwebsocket } from 'websocket';
import { getToken } from '../utils/auth';

class MessengerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
    };
  }

  componentDidMount() {
    // Set up urls
    const apiHost = process.env.REACT_APP_API_HOST;
    const urlBase = process.env.REACT_APP_CHATTER_BASE_URL;
    const wsBase = process.env.REACT_APP_WS_HOST;
    const tokenURL = `${apiHost}://${urlBase}/ws_token`;

    let {
      client,
    } = this.state;

    // Create a token to connect
    const token = getToken('auth');
    axios.get(tokenURL, {
      headers: {
        Authorization: token,
      },
    })
      .then((result) => {
        console.log(result);
        const authToken = result.data.result.token;
        const wsURL = `${wsBase}://${urlBase}/ws?token=${authToken}`;

        client = new W3cwebsocket(wsURL);

        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          console.log(message);
        };
        this.setState({ client });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Messenger Dashboard
        </Header>
        <div>
          <Grid textAlign="center" divided="vertically" verticalAlign="middle">
            <Grid.Row columns={3}>
              <Grid.Column width={3}>
                Hey
              </Grid.Column>
              <Grid.Column width={6}>
                hey
              </Grid.Column>
              <Grid.Column width={3}>
                Hey
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default MessengerDashboard;
