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
      connections: null,
      username: '',
      to: '',
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
        this.setState({ username: result.data.result.username });
        const wsURL = `${wsBase}://${urlBase}/ws?token=${authToken}`;

        client = new W3cwebsocket(wsURL);

        client.onopen = () => {
          console.log('WebSocket Client Connected');
          axios.get(usersURL)
            .then((connectionResult) => {
              this.setState({ connections: connectionResult.data.result });
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
      username,
      to,
    } = this.state;

    console.log('SENDING MESSAGE');
    client.send(JSON.stringify({
      username_from: username,
      username_to: to,
      message: Message,
    }));

    this.setState({ Message: '' });
  }

  changeTalkingTo = (event) => {
    this.setState({ to: event.target.name });
  }

  render() {
    const {
      Message,
      connections,
    } = this.state;

    let selectionButtons = null;

    if (connections != null) {
      selectionButtons = connections.map((connection) => (
        <Button
          key={Math.random().toString(36).substr(2, 9)}
          onClick={this.changeTalkingTo}
          name={connection.username}
        >
          {connection.username}
        </Button>
      ));
    }

    return (
      <div>
        <Header as="h2" textAlign="center">
          Messenger Dashboard
        </Header>
        <div>
          <Grid textAlign="center" divided="vertically" verticalAlign="middle">
            <Grid.Row columns={3}>
              <Grid.Column width={3}>
                {selectionButtons}
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
