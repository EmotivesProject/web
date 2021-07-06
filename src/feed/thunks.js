import axios from 'axios';
import { removeAuth } from '../auth/actions';
import {
  commentPost,
  fetchPosts,
  likePost,
  createPost,
  unlikePost,
  apiError,
  apiSuccess,
} from './actions';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_POSTIT_BASE_URL;

const requestGetPosts = (path, dispatch, auth, page) => {
  const url = `${host}://${base}/${path}?page=${page}`;

  axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const fetchedPosts = result.data.result;
      dispatch(apiSuccess('posts'));
      dispatch(fetchPosts(fetchedPosts, page));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(removeAuth());
        dispatch(fetchPosts([]));
      } else {
        dispatch(apiError('posts'));
      }
    });
};

const requestPostLike = (path, dispatch, auth) => {
  const url = `${host}://${base}/${path}`;
  axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const likedPost = result.data.result;
      dispatch(likePost(likedPost));
      dispatch(apiSuccess('like'));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(removeAuth());
        dispatch(fetchPosts([]));
      } else {
        dispatch(apiError('like'));
      }
    });
};

const requestPostComment = (path, dispatch, auth, body) => {
  const url = `${host}://${base}/${path}`;
  axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const comment = result.data.result;
      dispatch(commentPost(comment));
      dispatch(apiSuccess('comment'));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(removeAuth());
        dispatch(fetchPosts([]));
      } else {
        dispatch(apiError('comment'));
      }
    });
};

const createNewPostRequest = (path, dispatch, auth, body) => {
  const url = `${host}://${base}/${path}`;
  axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const post = result.data.result;
      dispatch(createPost(post));
      dispatch(apiSuccess('post'));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(removeAuth());
        dispatch(fetchPosts([]));
      } else {
        dispatch(apiError('post'));
      }
    });
};

const requestPostUnlike = (path, dispatch, auth) => {
  const url = `${host}://${base}/${path}`;
  axios.delete(url, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const post = result.data.result;
      dispatch(unlikePost(post));
      dispatch(apiSuccess('like'));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(removeAuth());
        dispatch(fetchPosts([]));
      } else {
        dispatch(apiError('like'));
      }
    });
};

const fetchPostsRequest = (auth, page) => async (dispatch) => {
  const path = 'post';
  requestGetPosts(path, dispatch, auth, page);
};

const likePostRequest = (auth, postID) => async (dispatch) => {
  const path = `post/${postID}/like`;
  requestPostLike(path, dispatch, auth);
};

const unlikePostRequest = (auth, postID, likeID) => async (dispatch) => {
  const path = `post/${postID}/like/${likeID}`;
  requestPostUnlike(path, dispatch, auth);
};

const commentPostRequest = (auth, message, postID) => async (dispatch) => {
  const path = `post/${postID}/comment`;
  const body = JSON.stringify({
    message,
  });
  requestPostComment(path, dispatch, auth, body);
};

const postRequest = (
  auth,
  type,
  message,
  latitude = null,
  longitude = null,
  zoom = null,
  imagePath = null,
) => async (dispatch) => {
  const path = 'post';
  const body = JSON.stringify({
    content: {
      type,
      message,
      latitude,
      longitude,
      zoom,
      image_path: imagePath,
    },
  });
  createNewPostRequest(path, dispatch, auth, body);
};

export {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
  unlikePostRequest,
};
