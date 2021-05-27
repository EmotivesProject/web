import {
  CREATE_POST,
  REMOVE_POST,
  FETCH_POSTS,
  LOADING_POSTS,
} from './actions';

const initialState = {
  page: 1,
  loading: false,
  error: null,
  posts: [],
};

const postState = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST: {
      const { post } = payload;
      const newPosts = [post, state.posts];
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
      const newStatePosts = posts.map(
        (fetchedPosts) => state.posts.find(
          (existingPost) => existingPost.post.id === fetchedPosts.post.id,
        ) || fetchedPosts,
      );
      return {
        ...state,
        posts: newStatePosts,
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
