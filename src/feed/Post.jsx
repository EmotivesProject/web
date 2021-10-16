import React from 'react';
import {
  Container,
  Header,
  Segment,
  Divider,
  Button,
  Icon,
  Grid,
} from 'semantic-ui-react';
import EmojiInput from '../shared/EmojiInput';
import getTimeAgoFromObject from '../utils/date';
import PostComments from './PostComments';

const Post = ({
  auth, data, likePost, unlikePost, commentPost,
}) => {
  let mainInformation = <>Default message</>;
  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else {
    const imageSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_KEY}&center=${content.latitude},${content.longitude}&zoom=15`;
    // Would prefer not to have this logic...
    mainInformation = process.env.STORYBOOK_RUN === undefined ? (
      /* eslint-disable jsx-a11y/anchor-has-content */
      /* eslint-disable jsx-a11y/control-has-associated-label */
      <div style={{ position: 'relative' }}>
        <iframe
          title={data.post.id}
          width="500"
          height="400"
          loading="lazy"
          src={imageSrc}
        />
        <a
          href={`/explore?id=${data.post.id}&lat=${content.latitude}&lng=${content.longitude}`}
          style={{
            position: 'absolute', top: 0, left: '10%', display: 'inline-block', width: '500px', height: '400px',
          }}
        />
      </div>
    ) : (
      <div style={{
        width: '500px',
        height: '400px',
      }}
      >
        Placeholder
      </div>
    );
  }

  let button = (
    <Button
      onClick={() => likePost(auth, data.post.id)}
      className="like-button"
      icon
      aria-label="like post"
      title="Like the post"
      tabIndex="0"
      content={<Icon name="like" />}
    />
  );

  const likeArray = data.likes ? data.likes : [];
  const likeIndex = likeArray.findIndex((like) => like.username === auth.username);
  if (likeIndex !== -1) {
    button = (
      <Button
        onClick={() => unlikePost(auth, data.post.id, likeArray[likeIndex].id)}
        className="unlike-button"
        aria-label="unlike post"
        title="Unlike the post"
        tabIndex="0"
        icon
        content={<Icon name="like" />}
      />
    );
  }

  const visitedString = data.post.content.title ? `visited ${data.post.content.title}` : null;
  const reactionString = data.post.content.reaction ? `${data.post.content.reaction}` : null;

  const comments = data.comments.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h3">Reactions</Header>
      <PostComments key={data.post.id} data={data.comments} />
    </div>
  ) : null;

  return (
    <Segment className="main-post-segment">
      <Container>
        <Header as="h2" dividing>
          {data.post.username}
          &nbsp;
          {visitedString}
          &nbsp;
          {reactionString}
          <Header.Subheader id="post-subheader">
            <Icon name="like" />
            {data.likes ? data.likes.length : 0}
            &nbsp;
            <Icon name="clock" />
            {getTimeAgoFromObject(data.post.updated_at)}
          </Header.Subheader>
        </Header>
        <Container textAlign="center" id="main-post">
          {mainInformation}
        </Container>
      </Container>
      <Divider />
      <Container>
        <Grid columns={2} textAlign="center">
          <Grid.Column>
            {button}
          </Grid.Column>
          <Grid.Column>
            <EmojiInput
              header="Comment on post"
              type="comment"
              action={commentPost}
              auth={auth}
              postID={data.post.id}
              subComponentID="emoji-comment-input"
              iconName="comment"
              content={<Icon name="comment" />}
            />
          </Grid.Column>
        </Grid>
      </Container>
      {comments}
    </Segment>
  );
};

export default Post;
