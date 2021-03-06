import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid, Message, Button } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import useWindowDimensions from '../shared/useWindowDimensions';
import Post from './Post';
import {
  getError,
  getPosts,
  getPage,
  getFinished,
  getLoading,
} from './selector';
import {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  unlikePostRequest,
} from './thunks';

const FIVE_SECONDS = 10000;

let initialized = false;

export const FeedPage = ({
  auth, posts, page, loadPosts, likePost, commentPost, unlikePost, errors, finished, loading,
}) => {
  const { width } = useWindowDimensions();

  const [refreshPageValue, setRefreshPageValue] = useState(0);

  if (auth === null) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadPosts(auth, refreshPageValue, false);
      if (refreshPageValue > page) {
        setRefreshPageValue(0);
      } else {
        setRefreshPageValue(refreshPageValue + 1);
      }
    }, FIVE_SECONDS);

    // This represents the unmount function, clears your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);

  if (!initialized) {
    loadPosts(auth, page, true);
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
      className="load-more"
      onClick={() => loadPosts(auth, page, true)}
      tabIndex="0"
      content="Load more"
      loading={loading}
      disabled={loading}
      icon="plus"
    />
  ) : null;

  const middleWidth = width < 1700 ? 12 : null;
  const sideWidths = middleWidth ? 2 : null;

  return (
    <>
      <TopBar />
      <Grid role="main" id="main">
        <Grid.Row columns="three">
          <Grid.Column width={sideWidths} />
          <Grid.Column width={middleWidth}>
            <h1>
              Feed
            </h1>
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
          <Grid.Column width={sideWidths} />
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
  page: getPage(state),
  finished: getFinished(state),
  errors: getError(state),
  loading: getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (auth, page, increasePage) => dispatch(fetchPostsRequest(auth, page, increasePage)),
  likePost: (auth, postID) => dispatch(likePostRequest(auth, postID)),
  unlikePost: (auth, postID, likeID) => dispatch(unlikePostRequest(auth, postID, likeID)),
  commentPost: (auth, message, postID) => dispatch(commentPostRequest(auth, message, postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
