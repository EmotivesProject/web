import React from 'react';
import { Comment } from 'semantic-ui-react';

const PostComment = ({ data }) => (
  <Comment id="comment">
    <strong>
      {data.username}
      :&nbsp;
    </strong>
    {data.message}
  </Comment>
);

export default PostComment;
