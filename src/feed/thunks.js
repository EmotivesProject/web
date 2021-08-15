import axios from 'axios';
import {
  commentPost,
  fetchPosts,
  likePost,
  createPost,
  unlikePost,
  apiError,
  apiSuccess,
  fetchComments,
  fetchPost,
} from './actions';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_POSTIT_BASE_URL;

async function requestGetPosts(path, dispatch, auth, page) {
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
}

async function requestGetPost(path, dispatch, auth) {
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
}

async function requestGetComments(path, dispatch, auth) {
  const url = `${host}://${base}/${path}`;

  await axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      const fetchedResult = result.data.result;
      dispatch(apiSuccess('comments'));
      dispatch(fetchComments(fetchedResult));
    })
    .catch(() => {
      dispatch(apiError('comments'));
    });
}

async function requestPostLike(path, dispatch, auth) {
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
}

async function requestPostComment(path, dispatch, auth, body) {
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
}

async function createNewPostRequest(path, dispatch, auth, body) {
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
}

async function requestPostUnlike(path, dispatch, auth) {
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
}

const fetchPostsRequest = (auth, page) => async (dispatch) => {
  const path = 'post';
  await requestGetPosts(path, dispatch, auth, page);
};

const fetchIndividualPostRequest = (auth, postID) => async (dispatch) => {
  const path = `post/${postID}`;
  await requestGetPost(path, dispatch, auth);
};

const fetchPostCommentsRequest = (auth, postID) => async (dispatch) => {
  const path = `post/${postID}/comment`;
  await requestGetComments(path, dispatch, auth);
};

const likePostRequest = (auth, postID) => async (dispatch) => {
  const path = `post/${postID}/like`;
  await requestPostLike(path, dispatch, auth);
};

const unlikePostRequest = (auth, postID, likeID) => async (dispatch) => {
  const path = `post/${postID}/like/${likeID}`;
  await requestPostUnlike(path, dispatch, auth);
};

const commentPostRequest = (auth, message, postID) => async (dispatch) => {
  const path = `post/${postID}/comment`;
  const body = JSON.stringify({
    message,
  });
  await requestPostComment(path, dispatch, auth, body);
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
  const body = JSON.stringify({
    content: {
      type,
      reaction,
      latitude,
      longitude,
      title,
    },
  });
  await createNewPostRequest(path, dispatch, auth, body);
};

export {
  fetchPostsRequest,
  fetchPostCommentsRequest,
  likePostRequest,
  commentPostRequest,
  postRequest,
  unlikePostRequest,
  fetchIndividualPostRequest,
};
