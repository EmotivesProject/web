import {
  CREATE_POST,
  REMOVE_POST,
  FETCH_POSTS,
  LOADING_POSTS,
} from './actions';

const initialState = {
  loading: false,
  error: null,
  posts: [],
};

const postState = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST: {
      const { post } = payload;
      const newPosts = state.posts.concat(post);
      return {
        ...state,
        posts: newPosts,
      };
    }
    case REMOVE_POST: {
      const { post: removePost } = payload;
      const newPosts = state.posts.filter((post) => post.id !== removePost.id);
      return {
        ...state,
        posts: newPosts,
      };
    }
    case FETCH_POSTS: {
      const { posts } = payload;
      const newPosts = state.posts.concat(posts);
      return {
        ...state,
        posts: newPosts,
      };
    }
    case LOADING_POSTS: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default postState;
