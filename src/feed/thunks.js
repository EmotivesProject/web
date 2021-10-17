import axios from 'axios';
import extractFirstEmoji from '../utils/extractFirstEmoji';
import {
  commentPost,
  fetchPosts,
  likePost,
  createPost,
  unlikePost,
  apiError,
  apiSuccess,
  fetchPost,
} from './actions';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_POSTIT_BASE_URL;

const fetchPostsRequest = (auth, page) => async (dispatch) => {
  const path = 'post';
  const url = `${host}://${base}/${path}?page=${page}`;

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const fetchedPosts = result.data.result;
      dispatch(apiSuccess('posts'));
      dispatch(fetchPosts(fetchedPosts, page));
    })
    .catch(() => {
      dispatch(apiError('post'));
    });
};

const fetchIndividualPostRequest = (auth, postID) => async (dispatch) => {
  const path = `post/${postID}`;

  const url = `${host}://${base}/${path}`;

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const fetchedPost = result.data.result;
      dispatch(apiSuccess('post'));
      dispatch(fetchPost(fetchedPost));
    })
    .catch(() => {
      dispatch(apiError('post'));
    });
};

const likePostRequest = (auth, postID) => async (dispatch) => {
  const path = `post/${postID}/like`;

  const url = `${host}://${base}/${path}`;

  await axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const likedPost = result.data.result;
      dispatch(apiSuccess('like'));
      dispatch(likePost(likedPost));
    })
    .catch(() => {
      dispatch(apiError('like'));
    });
};

const unlikePostRequest = (auth, postID, likeID) => async (dispatch) => {
  const path = `post/${postID}/like/${likeID}`;

  const url = `${host}://${base}/${path}`;

  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const post = result.data.result;
      dispatch(apiSuccess('like'));
      dispatch(unlikePost(post));
    })
    .catch(() => {
      dispatch(apiError('like'));
    });
};

const commentPostRequest = (auth, message, postID) => async (dispatch) => {
  const path = `post/${postID}/comment`;
  const body = JSON.stringify({
    message,
  });

  const url = `${host}://${base}/${path}`;

  await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const comment = result.data.result;
      dispatch(apiSuccess('comment'));
      dispatch(commentPost(comment));
    })
    .catch(() => {
      dispatch(apiError('comment'));
    });
};

const postRequest = (
  auth,
  type,
  reaction,
  latitude,
  longitude,
  title,
) => async (dispatch) => {
  const path = 'post';
  let actualReaction = reaction;
  if (type === 'map') {
    actualReaction = await extractFirstEmoji(reaction);
  }
  const body = JSON.stringify({
    content: {
      type,
      reaction: actualReaction,
      latitude,
      longitude,
      title,
    },
  });

  const url = `${host}://${base}/${path}`;

  await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const post = result.data.result;
      dispatch(createPost(post));
      dispatch(apiSuccess('post'));
    })
    .catch(() => {
      dispatch(apiError('post'));
    });
};

export {
  fetchPostsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
  unlikePostRequest,
  fetchIndividualPostRequest,
};
