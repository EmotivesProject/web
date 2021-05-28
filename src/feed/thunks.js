import axios from 'axios';
import { removeAuth } from '../auth/actions';
import { fetchPosts, likePost } from './actions';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_POSTIT_BASE_URL;

const requestGetPosts = (path, dispatch, token) => {
  const url = `${host}://${base}/${path}`;

  axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      const fetchedPosts = result.data.result;
      dispatch(fetchPosts(fetchedPosts));
    })
    .catch(() => {
      dispatch(removeAuth());
      dispatch(fetchPosts([]));
    });
};

const requestPostLike = (path, dispatch, token) => {
  const url = `${host}://${base}/${path}`;
  axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      const likedPost = result.data.result;
      dispatch(likePost(likedPost));
    })
    .catch(() => {
      dispatch(removeAuth());
      dispatch(fetchPosts([]));
    });
};

const fetchPostsRequest = (token) => async (dispatch) => {
  const path = 'post';
  requestGetPosts(path, dispatch, token);
};

const likePostRequest = (token, postID) => async (dispatch) => {
  const path = `post/${postID}/like`;
  requestPostLike(path, dispatch, token);
};

export { fetchPostsRequest, likePostRequest };
