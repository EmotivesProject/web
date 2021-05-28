import {
  CREATE_POST,
  REMOVE_POST,
  FETCH_POSTS,
  LIKE_POST,
  LOADING_POSTS,
  COMMENT_POST,
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
      const currentPosts = state.posts;
      currentPosts.unshift(post);
      return {
        ...state,
        posts: [...currentPosts],
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
    case LIKE_POST: {
      const { like } = payload;
      const currentPosts = state.posts;
      const likedPost = currentPosts.findIndex((post) => post.post.id === like.post_id);
      if (likedPost !== -1) {
        currentPosts[likedPost].likes = state.posts[likedPost].likes
          ? state.posts[likedPost].likes : [];
        currentPosts[likedPost].likes.push(like);
      }
      return {
        ...state,
        posts: [...currentPosts],
      };
    }
    case COMMENT_POST: {
      const { comment } = payload;
      const currentPosts = state.posts;
      const commentedPost = currentPosts.findIndex((post) => post.post.id === comment.post_id);
      if (commentedPost !== -1) {
        currentPosts[commentedPost].comments = state.posts[commentedPost].comments
          ? state.posts[commentedPost].comments : [];
        currentPosts[commentedPost].comments.push(comment);
      }
      return {
        ...state,
        posts: [...currentPosts],
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
