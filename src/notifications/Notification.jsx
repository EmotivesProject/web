import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import getTimeAgoFromObject from '../utils/date';

// comment, chat and thumbs up

const Notification = ({
  data,
  action,
  auth,
  visitAction,
}) => {
  const handleVisit = (e) => {
    e.preventDefault();

    visitAction(auth, data.link);
  };

  const notifButtons = (
    <div style={{ float: 'right' }}>
      {!data.seen ? (
        <Button
          onClick={() => action(auth, data.id)}
        >
          Seen
        </Button>
      ) : null }
    </div>
  );

  const info = (
    <div>
      {notifButtons}
      {data.message}
      <br />
      {getTimeAgoFromObject(data.created_at)}
    </div>
  );

  let icon = 'comment';

  switch (data.type) {
    case 'message':
      icon = 'commenting';
      break;
    case 'comment':
      icon = 'comment';
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
      <Message
        icon={icon}
        header={data.title}
        content={info}
        className={id}
        onClick={(e) => handleVisit(e)}
      />
    </>
  );
};

export default Notification;
