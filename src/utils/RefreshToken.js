import Axios from 'axios';
import { createAuth } from '../auth/actions';
import { extractToken } from './extractObjects';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_UACL_BASE_URL;
const refreshURL = `${host}://${base}/refresh`;

const RefreshToken = (
  store,
) => {
  const { authState } = store.getState();

  if (!authState) {
    return;
  }

  const { refreshToken } = authState;

  Axios.post(refreshURL, JSON.stringify({
    refresh_token: refreshToken,
  }))
    .then((result) => {
      const token = extractToken(result);
      store.dispatch(createAuth(token));
    })
    .catch((err) => Promise.reject(err));
};

export default RefreshToken;
