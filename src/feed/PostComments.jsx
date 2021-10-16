import React from 'react';
import { Card } from 'semantic-ui-react';
import Avatar from '../shared/Avatar';
import getTimeAgoFromObject from '../utils/date';

const PostComments = ({
  data,
  goRight,
}) => {
  const comments = (
    <Card.Group>
      {data.map((comment) => (
        <Card key={Math.random().toString(36).substr(2, 9)} className={goRight ? 'comment-right' : 'comment'}>
          <Card.Content>
            <Card.Header>
              <Avatar username={comment.username} name="small-avatar" />
              {comment.username}
            </Card.Header>
            <Card.Meta style={{ color: 'black' }}>
              {getTimeAgoFromObject(comment.created_at)}
            </Card.Meta>
            <Card.Description style={{ fontSize: 'xx-large', color: 'black' }}>
              {comment.message}
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );

  return (
    <>
      {comments}
    </>
  );
};

export default PostComments;
