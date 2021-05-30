import axios from 'axios';
import { removeAuth } from '../auth/actions';
import {
  commentPost,
  fetchPosts,
  likePost,
  createPost,
} from './actions';

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

const requestPostComment = (path, dispatch, token, body) => {
  const url = `${host}://${base}/${path}`;
  axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      const comment = result.data.result;
      dispatch(commentPost(comment));
    })
    .catch(() => {
      dispatch(removeAuth());
      dispatch(fetchPosts([]));
    });
};

const createNewPostRequest = (path, dispatch, token, body) => {
  const url = `${host}://${base}/${path}`;
  axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      const post = result.data.result;
      dispatch(createPost(post));
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

const commentPostRequest = (token, message, postID) => async (dispatch) => {
  const path = `post/${postID}/comment`;
  const body = JSON.stringify({
    message,
  });
  requestPostComment(path, dispatch, token, body);
};

const postRequest = (token, message) => async (dispatch) => {
  const path = 'post';
  const body = JSON.stringify({
    content: {
      message,
    },
  });
  createNewPostRequest(path, dispatch, token, body);
};

export {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
};
