import React from 'react';
import { Card } from 'semantic-ui-react';
import Avatar from '../shared/Avatar';
import getTimeAgoFromObject from '../utils/date';
import randomKey from '../utils/randomKey';

const PostComments = ({
  comments,
  likes,
  goRight,
}) => {
  const likeMessages = likes.map((like) => {
    const tmpObj = { ...like };
    tmpObj.message = '❤️';
    return tmpObj;
  });

  const fullComments = (array, array2) => {
    const full = [...array, ...array2];
    return full.sort((a, b) => a.created_at < b.created_at);
  };

  const actualComments = fullComments(comments, likeMessages);

  const postComments = (
    <Card.Group>
      {actualComments.map((comment) => (
        <Card key={randomKey()} className={goRight ? 'comment-right' : 'comment'}>
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
      {postComments}
    </>
  );
};

export default PostComments;
