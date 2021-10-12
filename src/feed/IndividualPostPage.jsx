import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import TopBar from '../shared/TopBar';
import getAuth from '../auth/selector';
import { getError, getPosts } from './selector';
import Post from './Post';
import {
  likePostRequest,
  commentPostRequest,
  unlikePostRequest,
  fetchIndividualPostRequest,
} from './thunks';

let initilised = false;

const IndividualPostPage = ({
  auth, posts, errors, likePost, unlikePost, commentPost, fetchPost,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const { id } = useParams();

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

  if (initilised === false) {
    fetchPost(auth, id);
    initilised = true;
  }

  return (
    <>
      <TopBar />
      <Grid role="main" id="main">
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
  errors: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (auth, postID) => dispatch(fetchIndividualPostRequest(auth, postID)),
  likePost: (auth, postID) => dispatch(likePostRequest(auth, postID)),
  unlikePost: (auth, postID, likeID) => dispatch(unlikePostRequest(auth, postID, likeID)),
  commentPost: (auth, message, postID) => dispatch(commentPostRequest(auth, message, postID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualPostPage);
