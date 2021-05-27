import axios from 'axios';
import { removeAuth } from '../auth/actions';
import { fetchPosts } from './actions';

const fetchPostsRequest = (token) => async (dispatch) => {
  const host = process.env.REACT_APP_API_HOST;
  const base = process.env.REACT_APP_POSTIT_BASE_URL;

  const url = `${host}://${base}/post`;

  axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => {
      const fetchedPosts = result.data.result;
      dispatch(fetchPosts(fetchedPosts));
    })
    .catch(() => {
      dispatch(removeAuth());
      dispatch(fetchPosts([]));
    });
};

export default fetchPostsRequest;
