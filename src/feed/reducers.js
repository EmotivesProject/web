import {
  CREATE_POST,
  REMOVE_POST,
  FETCH_POSTS,
  LIKE_POST,
  LOADING_POSTS,
  COMMENT_POST,
  UNLIKE_POST,
  API_ERROR,
  API_SUCCESS,
  FETCH_COMMENTS,
} from './actions';

const initialState = {
  page: 0,
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
      const { posts, page } = payload;
      const actualNewPosts = state.posts.concat(posts);
      return {
        ...state,
        posts: actualNewPosts,
        page: page + 1,
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
    case FETCH_COMMENTS: {
      const { data } = payload;
      const postID = data.post_id;
      const currentPosts = state.posts;
      const fetchedPost = currentPosts.findIndex((post) => post.post.id === postID);
      const mergedArray = [...currentPosts[fetchedPost].comments, ...data.comments];
      const set = new Set();
      const unionArray = mergedArray.filter((item) => {
        if (!set.has(item.id)) {
          set.add(item.id);
          return true;
        }
        return false;
      }, set);
      currentPosts[fetchedPost].comments = unionArray;
      return {
        ...state,
        posts: [...currentPosts],
        errors: null,
      };
    }
    case LOADING_POSTS: {
      return {
        ...state,
        loading: false,
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
    default:
      return state;
  }
};

export default postState;
