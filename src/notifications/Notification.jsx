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

  return (
    <>
      <a href={data.link}>
        <Message
          icon={icon}
          header={data.title}
          content={info}
        />
      </a>
      <br />
    </>
  );
};

export default Notification;
