import React from 'react';
import {
  Card,
} from 'semantic-ui-react';
import getTimeAgoFromObject from '../utils/date';

const MessengerMessage = ({ message }) => (
  <Card
    key={Math.random().toString(36).substr(2, 9)}
    fluid
  >
    <Card.Header>
      {message.username_from}
    </Card.Header>
    <Card.Meta>
      {getTimeAgoFromObject(message.created)}
    </Card.Meta>
    <Card.Content>
      {message.message}
    </Card.Content>
  </Card>
);

export default MessengerMessage;
