import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import EmojiInput from '../shared/EmojiInput';
import MapInput from '../shared/MapInput';
import Post from './Post';
import getPosts from './selector';
import {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
  unlikePostRequest,
} from './thunks';

const FeedPage = ({
  auth, posts, loadPosts, likePost, commentPost, createPost, unlikePost,
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
        <Grid.Row columns="three">
          <Grid.Column />
          <Grid.Column>
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
          </Grid.Column>
          <Grid.Column>
            <EmojiInput
              buttonText="Emoji Post"
              header="Create a post"
              type="post"
              action={createPost}
              token={auth.token}
              subComponentID="emoji-post-input"
              iconName="smile"
            />
            <br />
            <MapInput
              buttonText="Map Post"
              header="Create a Map Post"
              type="map"
              action={createPost}
              token={auth.token}
              subComponentID="emoji-map-input"
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
  unlikePost: (token, postID, likeID) => dispatch(unlikePostRequest(token, postID, likeID)),
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
