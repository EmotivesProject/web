import React from 'react';
import { connect } from 'react-redux';
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
import { getPosts } from './selector';
import {
  fetchPostCommentsRequest,
} from './thunks';

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
      <Link to={visitLink}>
        <Button
          id="marker-like-container"
          positive
        >
          Visit
        </Button>
      </Link>
    );
  }

  let button = <Button onClick={() => likePost(auth, data.post.id)} icon id="like-button"><Icon name="like" /></Button>;
  const likeArray = data.likes ? data.likes : [];
  const likeIndex = likeArray.findIndex((like) => like.username === auth.username);
  if (likeIndex !== -1) {
    button = (
      <Button
        onClick={() => unlikePost(auth, data.post.id, likeArray[likeIndex].id)}
        id="unlike-button"
        icon
      >
        <Icon name="like" />
      </Button>
    );
  }

  const visitedString = data.post.content.title ? `visited ${data.post.content.title}` : null;
  const reactionString = data.post.content.reaction ? `${data.post.content.reaction}` : null;

  const topReactions = data.emoji_count.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h2">Top Reactions</Header>
      <PostEmojis key={data.post.id} data={data.emoji_count} />
    </div>
  ) : null;

  const yourReactions = data.self_emoji_count.length !== 0 ? (
    <div>
      <Divider />
      <Header as="h2">Your Reactions</Header>
      <PostEmojis key={data.post.id} data={data.self_emoji_count} />
    </div>
  ) : null;

  return (
    <Segment id="main-post-segment">
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
            />
          </Grid.Column>
        </Grid>
      </Container>
      {topReactions}
      {yourReactions}
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  posts: getPosts(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadMoreComments: (auth, postID) => dispatch(fetchPostCommentsRequest(auth, postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
