import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid, Message, Button } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import EmojiInput from '../shared/EmojiInput';
import Post from './Post';
import {
  getError,
  getPosts,
  getPage,
  getFinished,
} from './selector';
import {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
  unlikePostRequest,
} from './thunks';

let initialized = false;

const FeedPage = ({
  auth, posts, page, loadPosts, likePost, commentPost, createPost, unlikePost, errors, finished,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  if (!initialized) {
    loadPosts(auth, page);
    initialized = true;
  }

  const errorMessage = errors !== null ? (
    <Message negative>
      <Message.Header>Error occurred</Message.Header>
      <p>
        An error occurred around&nbsp;
        {errors}
        &nbsp;try again or refresh
      </p>
    </Message>
  ) : null;

  console.log(posts);

  const loadMoreButton = !finished ? (
    <Button
      id="load-more-posts"
      onClick={() => loadPosts(auth, page)}
      positive
    >
      Load More!
    </Button>
  ) : null;

  return (
    <div>
      <TopBar />
      <Grid>
        <Grid.Row columns="three">
          <Grid.Column />
          <Grid.Column>
            {errorMessage}
            {posts.map((post) => (
              <Post
                key={post.post.id}
                data={post}
                auth={auth}
                likePost={likePost}
                unlikePost={unlikePost}
                commentPost={commentPost}
              />
            ))}
            {loadMoreButton}
          </Grid.Column>
          <Grid.Column>
            <EmojiInput
              buttonText="Emoji Post"
              header="Create a post"
              type="post"
              action={createPost}
              auth={auth}
              subComponentID="emoji-post-input"
              iconName="smile"
            />
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
  page: getPage(state),
  finished: getFinished(state),
  errors: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (auth, page) => dispatch(fetchPostsRequest(auth, page)),
  likePost: (auth, postID) => dispatch(likePostRequest(auth, postID)),
  unlikePost: (auth, postID, likeID) => dispatch(unlikePostRequest(auth, postID, likeID)),
  commentPost: (auth, message, postID) => dispatch(commentPostRequest(auth, message, postID)),
  createPost: (
    auth,
    type,
    message,
    latitude,
    longitude,
    zoom,
    imagePath,
  ) => dispatch(postRequest(auth, type, message, latitude, longitude, zoom, imagePath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
