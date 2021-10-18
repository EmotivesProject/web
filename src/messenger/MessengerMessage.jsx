import React from 'react';
import {
  Message,
} from 'semantic-ui-react';
import Avatar from '../shared/Avatar';

const MessengerMessage = ({ message, user, talkingTo }) => {
  if (message.username_from !== talkingTo && message.username_from !== user) {
    return (null);
  }

  return (
    <Message
      key={Math.random().toString(36).substr(2, 9)}
      className={user === message.username_from ? 'messenger-message' : 'messenger-message-non-self'}
    >
      <Message.Header>
        <Avatar username={message.username_from} name="small-avatar" />
        {message.username_from}
      </Message.Header>
      <p>{message.message}</p>
    </Message>
  );
};

export default MessengerMessage;
