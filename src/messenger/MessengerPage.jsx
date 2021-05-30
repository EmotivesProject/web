import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import {
  getClient,
  getTalkingTo,
  getUsers,
  getMessages,
} from './selector';
import {
  setupClient,
  getUsersRequest,
  sendMessageToSocket,
  requestPreviousMessages,
} from './thunks';

const MessengerPage = ({
  auth,
  setupClientDispatch,
  client,
  sendNewMessage,
  users,
  talkingTo,
  getPreviousMessages,
  messages,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  if (client === null) {
    setupClientDispatch(auth.token);
  }

  useEffect(() => {
    if (talkingTo !== '' && auth.username !== undefined) {
      getPreviousMessages(auth.token, auth.username, talkingTo);
    }
  }, [talkingTo]);

  return (
    <>
      <TopBar />
      Messenger
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            {users.map((user) => (
              <div key={user.username}>
                {user.username}
              </div>
            ))}
          </Grid.Column>
          <Grid.Column width={5}>
            <Button onClick={() => sendNewMessage('yos', auth.username, talkingTo)}>Submit Post</Button>
            {messages.map((message) => (
              <div key={message.id}>
                {message.message}
              </div>
            ))}
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  client: getClient(state),
  users: getUsers(state),
  talkingTo: getTalkingTo(state),
  messages: getMessages(state),
});

const mapDispatchToProps = (dispatch) => ({
  setupClientDispatch: (token) => dispatch(setupClient(token)),
  getListOfUsers: (token) => dispatch(getUsersRequest(token)),
  sendNewMessage: (message, from, to) => dispatch(sendMessageToSocket(message, from, to)),
  getPreviousMessages: (token, from, to) => dispatch(requestPreviousMessages(token, from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessengerPage);
