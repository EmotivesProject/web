import React, { Component } from 'react';
import axios from 'axios';

import {
  Header, Grid, TextArea, Form, Button,
} from 'semantic-ui-react';
import { w3cwebsocket as W3cwebsocket } from 'websocket';
import { getToken, setToken } from '../utils/auth';

class MessengerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      Message: '',
    };
  }

  componentDidMount() {
    // Set up urls
    const apiHost = process.env.REACT_APP_API_HOST;
    const urlBase = process.env.REACT_APP_CHATTER_BASE_URL;
    const wsBase = process.env.REACT_APP_WS_HOST;
    const tokenURL = `${apiHost}://${urlBase}/ws_token`;
    const usersURL = `${apiHost}://${urlBase}/connections`;

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
        const authToken = result.data.result.token;
        setToken('username', result.data.result.username);
        const wsURL = `${wsBase}://${urlBase}/ws?token=${authToken}`;

        client = new W3cwebsocket(wsURL);

        client.onopen = () => {
          console.log('WebSocket Client Connected');
          axios.get(usersURL)
            .then((connectionResult) => {
              console.log(connectionResult);
            });
        };
        client.onmessage = (message) => {
          console.log('MESSAGE RECEIVED');
          console.log(message);
        };
        this.setState({ client });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      client,
      Message,
    } = this.state;

    console.log('SENDING MESSAGE');
    client.send(JSON.stringify({
      username_from: 'ey',
      username_to: 'newtest',
      message: Message,
    }));

    this.setState({ Message: '' });
  }

  render() {
    const {
      Message,
    } = this.state;

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
                <Form onSubmit={this.handleSubmit}>
                  <TextArea
                    placeholder="Update your status"
                    name="Message"
                    value={Message}
                    onChange={this.handleChange}
                  />
                  <Button primary size="large">
                    Update Now
                  </Button>
                </Form>
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
