import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import Post from './Post';
import getPosts from './selector';
import { fetchPostsRequest, likePostRequest } from './thunks';

const FeedPage = ({
  auth, posts, loadPosts, likePost,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    loadPosts(auth.token);
  }, []);

  return (
    <>
      <TopBar />
      <Grid>
        <Grid.Row columns={3}>
          <Grid.Column width={5} />
          <Grid.Column width={5}>
            {posts.map((post) => (
              <Post key={post.post.id} data={post} auth={auth} likePost={likePost} />
            ))}
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (token) => dispatch(fetchPostsRequest(token)),
  likePost: (token, postID) => dispatch(likePostRequest(token, postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
