import React from 'react';
import { Message } from 'semantic-ui-react';
import getTimeAgoFromObject from '../utils/date';

// comment, chat and thumbs up

const Notification = ({
  data,
}) => {
  const info = `${data.message}. ${getTimeAgoFromObject(data.created_at)}`;

  let icon = 'comment';

  switch (data.type) {
    case 'message':
      icon = 'chat';
      break;
    case 'comment':
      icon = 'comment alternate';
      break;
    case 'like':
      icon = 'thumbs up';
      break;
    default:
      icon = 'circle notched';
  }

  const id = data.seen ? 'notification-has-seen' : 'notification-has-not-seen';

  return (
    <>
      <a href={data.link} aria-label={`visit notification for notification ${data.id}`}>
        <Message
          icon={icon}
          header={data.title}
          content={info}
          id={id}
        />
      </a>
      <br />
    </>
  );
};

export default Notification;
