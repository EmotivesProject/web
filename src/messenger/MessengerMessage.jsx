import React from 'react';
import {
  Message,
} from 'semantic-ui-react';

const MessengerMessage = ({ message, user }) => (
  <Message
    key={Math.random().toString(36).substr(2, 9)}
    id={user === message.username_from ? 'messenger-message' : 'messenger-message-non-self'}
  >
    <Message.Header>
      {message.username_from}
    </Message.Header>
    <p>{message.message}</p>
  </Message>
);

export default MessengerMessage;
