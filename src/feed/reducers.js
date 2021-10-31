import {
  CREATE_POST,
  REMOVE_POST,
  FETCH_POSTS,
  LIKE_POST,
  COMMENT_POST,
  UNLIKE_POST,
  API_ERROR,
  API_SUCCESS,
  FETCH_POST,
  UPDATE_LOADING,
} from './actions';

const initialState = {
  page: 0,
  finished: false,
  loading: false,
  error: null,
  posts: [],
  errors: null,
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
      const { posts, page, increasePage } = payload;
      const currentPosts = state.posts;

      const newPosts = posts.concat(
        currentPosts.filter((s) => !posts.find((t) => t.post.id === s.post.id)),
      );

      let finished = false;
      if (posts.length < 5) {
        finished = true;
      } else {
        finished = false;
      }
      let pageCount = page;
      if (increasePage) {
        pageCount += 1;
      }

      currentPosts.sort((a, b) => a.post.created_at > b.post.created_at);

      return {
        ...state,
        posts: newPosts,
        page: pageCount,
        finished,
      };
    }
    case FETCH_POST: {
      const { post } = payload;
      return {
        ...state,
        posts: [post],
        page: 0,
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
    case UNLIKE_POST: {
      const { like } = payload;
      const currentPosts = state.posts;
      const likedPost = currentPosts.findIndex((post) => post.post.id === like.post_id);
      if (likedPost !== -1) {
        let currentLikes = state.posts[likedPost].likes
          ? state.posts[likedPost].likes : [];
        currentLikes = currentLikes.filter((lik) => lik.id !== like.id);
        currentPosts[likedPost].likes = currentLikes;
      }
      return {
        ...state,
        posts: [...currentPosts],
      };
    }
    case COMMENT_POST: {
      const { comment } = payload;
      const actualNewPosts = state.posts.map(
        /* eslint-disable no-confusing-arrow */
        (post) => post.post.id !== comment.post.id ? post : comment,
      );
      return {
        ...state,
        posts: actualNewPosts,
      };
    }
    case API_ERROR: {
      const { name } = payload;
      return {
        ...state,
        errors: name,
      };
    }
    case API_SUCCESS: {
      return {
        ...state,
        errors: null,
      };
    }
    case UPDATE_LOADING: {
      const { loading } = payload;
      return {
        ...state,
        loading,
      };
    }
    default:
      return state;
  }
};

export default postState;
