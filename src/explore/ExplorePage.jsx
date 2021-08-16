import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  useLocation,
} from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {
  Button,
  Grid,
  Input,
} from 'semantic-ui-react';
import getAuth from '../auth/selector';
import { getError, getPosts, getPage } from '../feed/selector';
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

let initialized = false;

let initialCentre = {
  lat: -27.47,
  lng: 153.03,
};

const defaultZoom = 15;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

let queryID = -1;

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
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  const [explore, setExplore] = React.useState(true);
  const [newPost, setNewPost] = React.useState(null);
  const [currentInput, setCurrentInput] = React.useState('');

  if (!initialized) {
    loadPosts(auth, page);
    initialized = true;

    const query = useQuery();
    queryID = parseInt(query.get('id'), 10);
    const queryLat = parseFloat(query.get('lat'));
    const queryLng = parseFloat(query.get('lng'));

    if (!Number.isNaN(queryID) && !Number.isNaN(queryLat) && !Number.isNaN(queryLng)) {
      fetchPost(auth, queryID);
      initialCentre = {
        lat: queryLat,
        lng: queryLng,
      };
    }
  }

  let markers = null;

  const toggleExplore = () => {
    setExplore(!explore);
    setNewPost(null);
  };

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
      />
    );
  }

  const mapClicked = (e) => {
    if (!explore) {
      setNewPost(e);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const ToggleExploreButton = explore ? (
    <Button
      onClick={toggleExplore}
      primary
    >
      Set New Flag?
    </Button>
  ) : (
    <Button
      onClick={toggleExplore}
      primary
    >
      Just Explore
    </Button>
  );

  return (
    <>
      <TopBar key={Math.random().toString(36).substr(2, 9)} />
      <Grid columns={5} textAlign="center">
        <Grid.Column>
          {ToggleExploreButton}
        </Grid.Column>
        <Grid.Column>
          <Button
            onClick={handleClick}
            positive
          >
            Search
          </Button>
          <Input
            onChange={(e) => setCurrentInput(e.target.value)}
            value={currentInput}
            placeholder="Search..."
          />
        </Grid.Column>
      </Grid>
      <br />
      <div style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={initialCentre}
          defaultZoom={defaultZoom}
          onClick={(e) => mapClicked(e)}
        >
          {markers}
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
