import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import UniversalInput from '../shared/UniversalInput';
import Post from './Post';
import getPosts from './selector';
import {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
} from './thunks';

const FeedPage = ({
  auth, posts, loadPosts, likePost, commentPost, createPost,
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
              <Post
                key={post.post.id}
                data={post}
                auth={auth}
                likePost={likePost}
                commentPost={commentPost}
              />
            ))}
          </Grid.Column>
          <Grid.Column width={5}>
            <UniversalInput
              buttonText="Create a Post"
              header="Create a post"
              type="post"
              action={createPost}
              token={auth.token}
            />
            <UniversalInput
              buttonText="Create a Map Post"
              header="Create a Map Post"
              type="map"
              action={createPost}
              token={auth.token}
            />
          </Grid.Column>
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
  commentPost: (token, message, postID) => dispatch(commentPostRequest(token, message, postID)),
  createPost: (
    token,
    type,
    message,
    latitude,
    longitude,
    zoom,
    imagePath,
  ) => dispatch(postRequest(token, type, message, latitude, longitude, zoom, imagePath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
