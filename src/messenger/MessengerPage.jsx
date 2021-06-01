import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Grid, Header } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import EmojiInput from '../shared/EmojiInput';
import TopBar from '../shared/TopBar';
import MessengerMessage from './MessengerMessage';
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
  dispatchPersonSwitch,
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
  switchPersonTalking,
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

  const defaultMessage = talkingTo === ''
    ? (
      <>
        select someone to talk to
      </>
    )
    : (
      <Header>
        Talking to&nbsp;
        {talkingTo}
      </Header>
    );

  return (
    <>
      <TopBar />
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            {users.map((user) => {
              if (user.username !== auth.username) {
                return (
                  <Button
                    content={user.username}
                    key={user.username}
                    onClick={() => switchPersonTalking(user.username, talkingTo)}
                    positive={user.active}
                  />
                );
              }
              return null;
            })}
          </Grid.Column>
          <Grid.Column width={5}>
            {defaultMessage}
            {messages.map((message) => (
              <MessengerMessage key={message.id} message={message} user={auth.username} />
            ))}
          </Grid.Column>
          <Grid.Column width={5}>
            <EmojiInput
              buttonText="New Message"
              header="send a message"
              type="message"
              action={sendNewMessage}
              from={auth.username}
              to={talkingTo}
              subComponentID="emoji-messenger-input"
            />
          </Grid.Column>
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
  switchPersonTalking: (
    newPerson, oldPerson,
  ) => dispatch(dispatchPersonSwitch(newPerson, oldPerson)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessengerPage);
