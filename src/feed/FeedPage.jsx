import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import getPosts from './selector';
import fetchPostsRequest from './thunks';

const FeedPage = ({ auth, posts, loadPosts }) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    loadPosts(auth.token);
  }, []);

  return (
    <>
      <TopBar />
      Feed
      {posts.map((post) => <div key={post.post.id}>Hey</div>)}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (token) => dispatch(fetchPostsRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
