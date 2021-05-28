import React from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
  Button,
} from 'semantic-ui-react';
import getTimeAgoFromObject from '../utils/date';
import PostComment from './PostComment';

const Post = ({ auth, data, likePost }) => {
  console.log(data);

  return (
    <Segment>
      <Container>
        <Header as="h2">{data.post.username}</Header>
        <Header as="h2">
          {data.likes ? data.likes.length : 0}
          &nbsp;Likes
          <Button onClick={() => likePost(auth.token, data.post.id)}>Submit Like</Button>
        </Header>
        <Header as="h4">{getTimeAgoFromObject(data.post.updated_at)}</Header>
        <Divider />
        <Container textAlign="center">
          {data.post.content.message}
        </Container>
      </Container>
      <Divider />
      <Header as="h4">Comments</Header>
      {data.comments ? data.comments.map((comment) => (
        <PostComment key={comment.id} data={comment} />
      )) : null }
      <Header as="h4">New Comment?</Header>
      <Button>Submit Comment</Button>
    </Segment>
  );
};

export default Post;
