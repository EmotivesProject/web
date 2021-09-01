import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid, Message, Button } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
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
  unlikePostRequest,
} from './thunks';

let initialized = false;

const FeedPage = ({
  auth, posts, page, loadPosts, likePost, commentPost, unlikePost, errors, finished,
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

  const loadMoreButton = !finished ? (
    <Button
      id="load-more-posts"
      onClick={() => loadPosts(auth, page)}
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
          <Grid.Column />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
