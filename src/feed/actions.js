export const CREATE_POST = 'CREATE_POST';
export const createPost = (post) => ({
  type: CREATE_POST,
  payload: { post },
});

export const REMOVE_POST = 'REMOVE_POST';
export const removePost = (post) => ({
  type: REMOVE_POST,
  payload: { post },
});

export const LIKE_POST = 'LIKE_POST';
export const likePost = (like) => ({
  type: LIKE_POST,
  payload: { like },
});

export const UNLIKE_POST = 'UNLIKE_POST';
export const unlikePost = (like) => ({
  type: UNLIKE_POST,
  payload: { like },
});

export const COMMENT_POST = 'COMMENT_POST';
export const commentPost = (comment) => ({
  type: COMMENT_POST,
  payload: { comment },
});

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (posts, page) => ({
  type: FETCH_POSTS,
  payload: { posts, page },
});

export const FETCH_MORE_POSTS = 'FETCH_MORE_POSTS';
export const fetchMorePosts = (posts) => ({
  type: FETCH_MORE_POSTS,
  payload: { posts },
});

export const LOADING_POSTS = 'LOADING_POSTS';
export const loadingPosts = () => ({
  type: FETCH_POSTS,
});

export const API_ERROR = 'API_ERROR';
export const apiError = (name) => ({
  type: API_ERROR,
  payload: { name },
});

export const API_SUCCESS = 'API_SUCCESS';
export const apiSuccess = (name) => ({
  type: API_SUCCESS,
  payload: { name },
});
