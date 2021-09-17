import React from 'react';
import { Link } from 'react-router-dom';
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
import PostEmojis from './PostEmojis';

const Post = ({
  auth, data, likePost, unlikePost, commentPost,
}) => {
  let mainInformation = <>Default message</>;
  let visitButton = null;
  const { content } = data.post;
  if (data.post.content.type === 'emoji') {
    mainInformation = content.message;
  } else {
    const imageSrc = `https://www.google.com/maps/embed/v1/view?key=${process.env.REACT_APP_GOOGLE_KEY}&center=${content.latitude},${content.longitude}&zoom=15`;
    mainInformation = (
      <iframe
        title={data.post.id}
        width="500"
        height="400"
        loading="lazy"
        src={imageSrc}
      />
    );
    const visitLink = `/explore?id=${data.post.id}&lat=${content.latitude}&lng=${content.longitude}`;
    visitButton = (
      <Link to={visitLink} aria-label={`explore post ${data.post.id}`}>
        <Button
          className="marker-like-container"
          content="Explore here"
        />
      </Link>
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

  const topReactions = data.emoji_count.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h3">Reactions</Header>
      <PostEmojis key={data.post.id} data={data.emoji_count} />
    </div>
  ) : null;

  const yourReactions = data.self_emoji_count.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h3">Your Reactions</Header>
      <PostEmojis key={data.post.id} data={data.self_emoji_count} />
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
          {visitButton}
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
      {topReactions}
      {yourReactions}
    </Segment>
  );
};

export default Post;
