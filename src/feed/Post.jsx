import React from 'react';
import { connect } from 'react-redux';
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
import PostComment from './PostComment';
import { getPosts } from './selector';
import {
  fetchPostCommentsRequest,
} from './thunks';

let loadedMore = false;

const Post = ({
  auth, data, likePost, unlikePost, commentPost, loadMoreComments,
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

  console.log(data);

  const loadComments = () => {
    loadedMore = true;
    loadMoreComments(auth, data.post.id);
  };

  const LoadMoreButton = loadedMore ? null
    : (
      <Button
        id="load-more-posts"
        onClick={() => loadComments()}
        positive
      >
        Load More
      </Button>
    );

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

  return (
    <Segment id="main-post-segment">
      <Container>
        <Header as="h2" dividing>
          {data.post.username}
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
      <Divider />
      <Header as="h2">Comments</Header>
      {LoadMoreButton}
      {data.comments ? data.comments.map((comment) => (
        <PostComment key={comment.id} data={comment} />
      )) : null }
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
