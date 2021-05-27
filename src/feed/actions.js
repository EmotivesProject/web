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

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (posts) => ({
  type: FETCH_POSTS,
  payload: { posts },
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
