import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import GoogleMapReact from 'google-map-react';
import getAuth from '../auth/selector';
import { getError, getPosts, getPage } from '../feed/selector';
import TopBar from '../shared/TopBar';
import {
  fetchPostsRequest,
} from '../feed/thunks';
import Marker from './Marker';

let initialized = false;

const initialCentre = {
  lat: -27.47,
  lng: 153.03,
};

const defaultZoom = 15;

const ExplorePage = ({
  auth,
  posts,
  loadPosts,
  page,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  if (!initialized) {
    loadPosts(auth, page);
    initialized = true;
  }

  return (
    <>
      <TopBar key={Math.random().toString(36).substr(2, 9)} />
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={initialCentre}
          defaultZoom={defaultZoom}
        >
          {posts.map((post) => (
            <Marker
              key={post.post.id}
              data={post}
              lat={post.post.content.latitude}
              lng={post.post.content.longitude}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
  page: getPage(state),
  errors: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (auth, page) => dispatch(fetchPostsRequest(auth, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
