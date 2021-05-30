import React from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
  Button,
} from 'semantic-ui-react';
import UniversalInput from '../shared/UniversalInput';
import getTimeAgoFromObject from '../utils/date';
import PostComment from './PostComment';

const Post = ({
  auth, data, likePost, commentPost,
}) => {
  let mainInformation = <>Default message</>;
  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else {
    const imageSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_KEY}&center=${content.latitude},${content.longitude}&zoom=${content.zoom}&maptype=satellite`;
    mainInformation = (
      <iframe
        title={data.post.id}
        width="500"
        height="400"
        loading="lazy"
        src={imageSrc}
      />
    );
  }

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
          {mainInformation}
        </Container>
      </Container>
      <Divider />
      <Header as="h4">Comments</Header>
      {data.comments ? data.comments.map((comment) => (
        <PostComment key={comment.id} data={comment} />
      )) : null }
      <Header as="h4">New Comment?</Header>
      <UniversalInput
        buttonText="Submit Comment"
        header="Comment on post"
        type="comment"
        action={commentPost}
        token={auth.token}
        postID={data.post.id}
      />
    </Segment>
  );
};

export default Post;
