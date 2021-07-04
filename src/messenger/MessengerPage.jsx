import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Button, Divider, Grid, Header, Segment,
} from 'semantic-ui-react';
import getAuth from '../auth/selector';
import EmojiInput from '../shared/EmojiInput';
import TopBar from '../shared/TopBar';
import MessengerMessage from './MessengerMessage';
import {
  getClient,
  getTalkingTo,
  getMessages,
  getActiveUsers,
  getInactiveUsers,
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
  activeUsers,
  inactiveUsers,
  talkingTo,
  getPreviousMessages,
  messages,
  switchPersonTalking,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const chatContainer = React.createRef();

  if (client === null) {
    setupClientDispatch(auth.token);
  }

  useEffect(() => {
    if (talkingTo !== '' && auth.username !== undefined) {
      getPreviousMessages(auth.token, auth.username, talkingTo);
    }
  }, [talkingTo]);

  const scrollToMyRef = () => {
    const scroll = chatContainer.current.scrollHeight
    - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrollToMyRef();
  }, [messages]);

  const defaultMessage = talkingTo === ''
    ? (
      <Header id="default-message">
        select someone to talk to
      </Header>
    )
    : (
      <Header id="default-message">
        Talking to&nbsp;
        {talkingTo}
      </Header>
    );

  const availableMessages = messages.map((message) => (
    <MessengerMessage
      key={Math.random().toString(36).substr(2, 9)}
      message={message}
      user={auth.username}
    />
  ));

  const newMessageButton = talkingTo === ''
    ? null
    : (
      <EmojiInput
        buttonText="New Message"
        header="send a message"
        type="message"
        action={sendNewMessage}
        from={auth.username}
        to={talkingTo}
        subComponentID="emoji-messenger-input"
      />
    );

  return (
    <>
      <TopBar key={Math.random().toString(36).substr(2, 9)} />
      <Grid id="grid-page">
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            <Segment raised id="messenger-list">
              <Header content="Active Users" />
              {activeUsers.map((user) => {
                if (user.username !== auth.username) {
                  return (
                    <div key={Math.random().toString(36).substr(2, 9)}>
                      <Button
                        id={user.username === talkingTo ? 'user-messenger-talking' : 'user-messenger'}
                        content={user.username}
                        key={Math.random().toString(36).substr(2, 9)}
                        onClick={() => {
                          switchPersonTalking(user.username, talkingTo);
                        }}
                        positive={user.active}
                      />
                      <br />
                    </div>
                  );
                }
                return null;
              })}
              <Header content="Offline Users" />
              {inactiveUsers.map((user) => {
                if (user.username !== auth.username) {
                  return (
                    <div key={Math.random().toString(36).substr(2, 9)}>
                      <Button
                        id={user.username === talkingTo ? 'user-messenger-talking' : 'user-messenger'}
                        content={user.username}
                        key={Math.random().toString(36).substr(2, 9)}
                        onClick={() => switchPersonTalking(user.username, talkingTo)}
                        positive={user.active}
                      />
                      <br />
                    </div>
                  );
                }
                return null;
              })}
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment id="messenger-feed">
              <Grid.Row id="messenger-title">
                {defaultMessage}
              </Grid.Row>
              <Divider />
              <div ref={chatContainer} id="messenger-items">
                <Grid.Row>
                  {availableMessages}
                </Grid.Row>
              </div>
              <Divider />
              <Grid.Row id="messenger-new-message" key={Math.random().toString(36).substr(2, 9)}>
                {newMessageButton}
              </Grid.Row>
            </Segment>
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
  activeUsers: getActiveUsers(state),
  inactiveUsers: getInactiveUsers(state),
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
