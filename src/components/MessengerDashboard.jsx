import React, { Component } from 'react';
import axios from 'axios';

import {
  Header, Grid, TextArea, Form, Button, Card,
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
      previousMessages: [],
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
          axios.get(usersURL)
            .then((connectionResult) => {
              this.setState({ to: connectionResult.data.result[0].username });
              this.setState({ connections: connectionResult.data.result });
              this.getPreviousMessages();
            });
        };
        client.onmessage = (message) => {
          const messageObject = JSON.parse(message.data);
          const {
            username,
            to,
            previousMessages,
          } = this.state;

          if ((messageObject.username_from === username
            || messageObject.username_to === username)
            && (messageObject.username_from === to
            || messageObject.username_to === to)) {
            let tempArray = [];
            if (previousMessages != null) {
              tempArray = [
                ...previousMessages,
                messageObject,
              ];
            } else {
              tempArray = [
                messageObject,
              ];
            }
            this.setState({ previousMessages: tempArray });
          }
        };
        this.setState({ client });
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

    client.send(JSON.stringify({
      username_from: username,
      username_to: to,
      message: Message,
    }));

    this.setState({ Message: '' });
  }

  changeTalkingTo = (event) => {
    this.setState({ to: event.target.name });
    this.getPreviousMessages();
  }

  getPreviousMessages = () => {
    const apiHost = process.env.REACT_APP_API_HOST;
    const urlBase = process.env.REACT_APP_CHATTER_BASE_URL;
    const {
      username,
      to,
    } = this.state;
    const messagesURL = `${apiHost}://${urlBase}/messages?from=${username}&to=${to}`;
    const token = getToken('auth');

    axios.get(messagesURL, {
      headers: {
        Authorization: token,
      },
    })
      .then((result) => {
        this.setState({ previousMessages: result.data.result });
      });
  }

  render() {
    const {
      Message,
      connections,
      previousMessages,
    } = this.state;

    let selectionButtons = null;
    let segmentMessages = null;

    if (connections != null) {
      selectionButtons = connections.map((connection) => (
        <Button
          key={Math.random().toString(36).substr(2, 9)}
          onClick={this.changeTalkingTo}
          name={connection.username}
          primary={connection.active}
          size="large"
        >
          {connection.username}
        </Button>
      ));
    }

    if (previousMessages != null) {
      segmentMessages = previousMessages.map((previousMessage) => (
        <Card fluid>
          <Card.Header>
            {previousMessage.username_from}
          </Card.Header>
          <Card.Meta>
            {previousMessage.created}
          </Card.Meta>
          <Card.Content>
            {previousMessage.message}
          </Card.Content>
        </Card>
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
                {segmentMessages}
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
