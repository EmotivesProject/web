import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  useLocation,
} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {
  Button,
  Grid,
  Popup,
} from 'semantic-ui-react';
import getAuth from '../auth/selector';
import {
  getPosts,
  getPage,
  getFinished,
} from '../feed/selector';
import TopBar from '../shared/TopBar';
import {
  commentPostRequest,
  fetchIndividualPostRequest,
  fetchPostsRequest,
  likePostRequest,
  postRequest,
  unlikePostRequest,
} from '../feed/thunks';
import Marker from './Marker';
import TempMarker from './TempMarker';
import AutoComplete from './AutoComplete';

// See https://developers.google.com/maps/documentation/javascript/reference/map

const fetchMorePostRate = 1000 * 10; // 10 seconds. Do not reduce to below 5 seconds!

const defaultZoom = 15;

const FIVE_SECONDS = 10000;

let initialized = false;

// Brisbane centre
let initialCentre = {
  lat: -27.47,
  lng: 153.03,
};

let queryID = -1;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const ExplorePage = ({
  auth,
  posts,
  loadPosts,
  page,
  fetchPost,
  likePost,
  unlikePost,
  commentPost,
  createPost,
  finished,
}) => {
  // Ensure user is logged in
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const [newPost, setNewPost] = React.useState(null);
  const [modelOpen, setModalOpen] = React.useState(false);
  const [viewingPost, setViewingPost] = React.useState(false);
  const [refreshPageValue, setRefreshPageValue] = React.useState(0);

  const stateRef = useRef();

  stateRef.current = viewingPost;

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

  // Used to constantly load new posts
  useEffect(() => {
    const interval = setInterval(() => {
      if (!finished) {
        loadPosts(auth, page, true);
      }
    }, fetchMorePostRate);
    return () => clearInterval(interval);
  }, [page, finished]);

  // Used for autocomplete searching
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.map.panTo({ lat, lng });
    mapRef.current.map.setZoom(defaultZoom);
  }, []);

  // Basic first initialized commands
  if (!initialized) {
    loadPosts(auth, page, true);
    initialized = true;

    const query = useQuery();
    queryID = parseInt(query.get('id'), 10);
    const queryLat = parseFloat(query.get('lat'));
    const queryLng = parseFloat(query.get('lng'));

    // If the query params is fully set then setup to look at a single post
    if (!Number.isNaN(queryID) && !Number.isNaN(queryLat) && !Number.isNaN(queryLng)) {
      fetchPost(auth, queryID);
      initialCentre = {
        lat: queryLat,
        lng: queryLng,
      };
    }
  }

  const mapDragged = (e) => {
    initialCentre = {
      lat: e.center.lat(),
      lng: e.center.lng(),
    };
  };

  const mapClicked = (e) => {
    setTimeout(() => {
      const inStreetView = mapRef.current.map.getStreetView().getVisible();
      if (!modelOpen && !stateRef.current && !inStreetView) {
        setModalOpen(true);
        setNewPost(e);
      }
    }, 200);
  };

  const panToMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        panTo({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  };

  // Display post markers if exploring, otherwise display a creating post view
  const markers = posts.map((post) => (
    <Marker
      key={post.post.id}
      data={post}
      lat={post.post.content.latitude}
      lng={post.post.content.longitude}
      fetchPost={fetchPost}
      auth={auth}
      likePost={likePost}
      unlikePost={unlikePost}
      commentPost={commentPost}
      setViewingPost={setViewingPost}
      onClick={() => setViewingPost(true)}
    />
  ));

  let newMarker = null;
  if (newPost !== null) {
    newMarker = (
      <TempMarker
        key="newPostData"
        lat={newPost.lat}
        lng={newPost.lng}
        createPost={createPost}
        info={newPost}
        auth={auth}
        setModalOpen={setModalOpen}
        modalState={modelOpen}
        setNewPost={setNewPost}
      />
    );
  }

  // Would prefer not to have this logic
  const mapDiv = process.env.STORYBOOK_RUN === undefined ? (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
      defaultCenter={initialCentre}
      defaultZoom={defaultZoom}
      onClick={(e) => mapClicked(e)}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={onMapLoad}
      onDrag={(e) => mapDragged(e)}
      options={{ streetViewControl: true }}
    >
      {markers}
      {newMarker}
    </GoogleMapReact>
  ) : (
    <div>
      Placeholder
    </div>
  );

  return (
    <>
      <TopBar />
      <div role="main" id="main">
        <Grid columns={3} textAlign="center">
          <Grid.Column />
          <Grid.Column>
            <h1>
              Explore
            </h1>
          </Grid.Column>
          <Grid.Column />
        </Grid>
        <Grid columns={2} textAlign="center">
          <Grid.Column>
            <Popup
              position="top center"
              trigger={(
                <Button
                  tabIndex="0"
                  onClick={panToMe}
                  className="typical-button"
                  icon="map marker alternate"
                  content="To me"
                />
              )}
            >
              My Location
            </Popup>
          </Grid.Column>
          <Grid.Column>
            <AutoComplete panTo={panTo} currentPos={initialCentre} />
          </Grid.Column>
        </Grid>
        <br />
        <div id="google-maps-div">
          {mapDiv}
        </div>
      </div>
    </>
  );
};

// Connect up state and dispatch events required
const mapStateToProps = (state) => ({
  auth: getAuth(state),
  posts: getPosts(state),
  page: getPage(state),
  finished: getFinished(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPosts: (auth, page, increasePage) => dispatch(fetchPostsRequest(auth, page, increasePage)),
  fetchPost: (auth, postID) => dispatch(fetchIndividualPostRequest(auth, postID)),
  likePost: (auth, postID) => dispatch(likePostRequest(auth, postID)),
  unlikePost: (auth, postID, likeID) => dispatch(unlikePostRequest(auth, postID, likeID)),
  commentPost: (auth, message, postID) => dispatch(commentPostRequest(auth, message, postID)),
  createPost: (
    auth,
    type,
    reaction,
    latitude,
    longitude,
    title,
  ) => dispatch(postRequest(auth, type, reaction, latitude, longitude, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage);
