import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  useLocation,
} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {
  Button,
  Grid,
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

const fetchMorePostRate = 1000 * 5; // 10 seconds. Do not reduce to below 5 seconds!

const defaultZoom = 15;

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

const ExplorePage = ({
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

  const [explore, setExplore] = React.useState(true);
  const [pauseLoading, setPauseLoading] = React.useState(false);
  const [newPost, setNewPost] = React.useState(null);
  const [modelOpen, setModalOpen] = React.useState(false);

  // Used to constantly load new posts
  useEffect(() => {
    const interval = setInterval(() => {
      if (!finished && !pauseLoading) {
        loadPosts(auth, page);
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
    loadPosts(auth, page);
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

  // General helper functions
  const toggleExplore = () => {
    setExplore(!explore);
    setNewPost(null);
  };

  const switchPauseLoading = () => {
    setPauseLoading(!pauseLoading);
  };

  const mapDragged = (e) => {
    initialCentre = {
      lat: e.center.lat(),
      lng: e.center.lng(),
    };
  };

  const mapClicked = (e) => {
    if (!explore && !modelOpen) {
      setNewPost(e);
    }
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
  let markers = null;
  if (explore) {
    markers = posts.map((post) => (
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
      />
    ));
  } else if (newPost != null) {
    markers = (
      <TempMarker
        key="newPostData"
        lat={newPost.lat}
        lng={newPost.lng}
        createPost={createPost}
        info={newPost}
        auth={auth}
        setExplore={setExplore}
        setModalOpen={setModalOpen}
      />
    );
  }

  const pauseLoadingButtonText = pauseLoading ? 'Unpause Loading' : 'Pause Loading';

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
        <Grid columns={4} textAlign="center">
          <Grid.Column>
            <Button
              onClick={toggleExplore}
              id="new-flag"
              tabIndex="0"
            >
              {explore ? 'Set New Flag?' : 'Just Explore'}
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              tabIndex="0"
              onClick={panToMe}
              id="pan-button"
            >
              Centre to me
            </Button>
          </Grid.Column>
          <Grid.Column>
            <AutoComplete panTo={panTo} currentPos={initialCentre} />
          </Grid.Column>
          <Grid.Column>
            <Button
              tabIndex="0"
              onClick={switchPauseLoading}
              id="switch-loading-button"
            >
              {pauseLoadingButtonText}
            </Button>
          </Grid.Column>
        </Grid>
        <br />
        <div id="google-maps-div">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={initialCentre}
            defaultZoom={defaultZoom}
            onClick={(e) => mapClicked(e)}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={onMapLoad}
            onDrag={(e) => mapDragged(e)}
          >
            {markers}
          </GoogleMapReact>
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
  loadPosts: (auth, page) => dispatch(fetchPostsRequest(auth, page)),
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
