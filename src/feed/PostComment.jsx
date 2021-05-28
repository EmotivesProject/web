import React from 'react';
import { Comment } from 'semantic-ui-react';
import getTimeAgoFromObject from '../utils/date';

const PostComment = ({ data }) => (
  <Comment>
    <Comment.Content>
      <Comment.Author>
        {data.username}
      </Comment.Author>
      <Comment.Metadata>
        {getTimeAgoFromObject(data.updated_at)}
      </Comment.Metadata>
      <Comment.Text>
        {data.message}
      </Comment.Text>
    </Comment.Content>
  </Comment>
);

export default PostComment;
