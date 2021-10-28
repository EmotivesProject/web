import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  useLocation,
} from 'react-router-dom';
import {
  Button, Divider, Grid, Header, Segment, Message,
} from 'semantic-ui-react';
import getAuth from '../auth/selector';
import EmojiInput from '../shared/EmojiInput';
import TopBar from '../shared/TopBar';
import useWindowDimensions from '../shared/useWindowDimensions';
import extractPendingMessages from '../utils/extractPendingMessages';
import MessengerMessage from './MessengerMessage';
import Avatar from '../shared/Avatar';
import {
  getClient,
  getTalkingTo,
  getMessages,
  getActiveUsers,
  getInactiveUsers,
  getError,
} from './selector';
import {
  setupClient,
  getUsersRequest,
  sendMessageToSocket,
  requestPreviousMessages,
  dispatchPersonSwitch,
} from './thunks';
import randomKey from '../utils/randomKey';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let initialised = false;

export const MessengerPage = ({
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
  errors,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const { width } = useWindowDimensions();

  const errorMessage = errors !== null ? (
    <Message negative>
      <Message.Header>Error occurred</Message.Header>
      <p>
        An error occurred around&nbsp;
        {errors}
        &nbsp;try again or refresh
      </p>
    </Message>
  ) : null;

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

  if (!initialised) {
    const query = useQuery();
    const paramTalkingTo = query.get('talking-to');
    if (paramTalkingTo !== null) {
      switchPersonTalking(paramTalkingTo, null);
    }
    initialised = true;
  }

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
        <Avatar username={talkingTo} name="small-avatar" />
      </Header>
    );

  const availableMessages = messages.map((message) => (
    <MessengerMessage
      key={randomKey()}
      message={message}
      user={auth.username}
      talkingTo={talkingTo}
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
        allowKeyboard
      />
    );

  const pendingMessages = extractPendingMessages(messages, talkingTo);

  const middleWidth = width < 1700 ? 11 : '8';
  const sideWidths = middleWidth === 11 ? 4 : '4';
  const finalWidth = sideWidths === '4' ? '4' : 1;

  return (
    <>
      <TopBar key={randomKey()} />
      <div role="main" id="main">
        <Grid id="grid-page">
          <Grid.Column width={sideWidths} id="possible-talking">
            <Segment raised id="messenger-list">
              <Header content="Active Users" />
              {activeUsers.map((user) => {
                if (user.username !== auth.username) {
                  const data = pendingMessages.find((pendingMessage) => (
                    pendingMessage.username_from === user.username
                  ));
                  const content = data ? `${user.username} (${data.total})` : `${user.username}`;
                  return (
                    <div key={randomKey()}>
                      <Button
                        className={user.username === talkingTo ? 'user-messenger-talking' : 'user-messenger'}
                        content={content}
                        key={randomKey()}
                        onClick={() => {
                          switchPersonTalking(user.username, talkingTo);
                        }}
                      >
                        <Avatar username={user.username} name="small-avatar" />
                        {user.username}
                      </Button>
                    </div>
                  );
                }
                return null;
              })}
              <Header content="Offline Users" />
              {inactiveUsers.map((user) => {
                if (user.username !== auth.username) {
                  return (
                    <div key={randomKey()}>
                      <Button
                        className={user.username === talkingTo ? 'user-messenger-talking' : 'user-messenger'}
                        content={user.username}
                        key={randomKey()}
                        onClick={() => switchPersonTalking(user.username, talkingTo)}
                        positive={user.active}
                      >
                        <Avatar username={user.username} name="small-avatar" />
                        {user.username}
                      </Button>
                      <br />
                    </div>
                  );
                }
                return null;
              })}
            </Segment>
          </Grid.Column>
          <Grid.Column width={middleWidth}>
            <h1 hidden>
              Instant Message
            </h1>
            <Segment id="messenger-feed">
              {errorMessage}
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
              <Grid.Row id="messenger-new-message" key={randomKey()}>
                {newMessageButton}
              </Grid.Row>
            </Segment>
          </Grid.Column>
          <Grid.Column width={finalWidth} />
        </Grid>
      </div>
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
  errors: getError(state),
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
