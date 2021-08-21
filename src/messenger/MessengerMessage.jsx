import React from 'react';
import {
  Message,
} from 'semantic-ui-react';

const MessengerMessage = ({ message, user, talkingTo }) => {
  if (message.username_from !== talkingTo && message.username_from !== user) {
    return (null);
  }

  return (
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
};

export default MessengerMessage;
