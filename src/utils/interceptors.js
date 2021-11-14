import Axios from 'axios';
import { createAuth, removeAuth } from '../auth/actions';
import { extractToken } from './extractObjects';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_UACL_BASE_URL;
const refreshURL = `${host}://${base}/refresh`;

// Used to intercept each request and refresh the JWT token if we get
// a 401 from the API.
const interceptor = (store) => {
  const intercept = Axios.interceptors.response.use(
    (next) => Promise.resolve(next),
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      Axios.interceptors.response.eject(intercept);

      // Retrieve the refresh token from the state.
      const { authState } = store.getState();
      const { refreshToken } = authState;

      // Attempt to refresh the auth_token if we got the 401
      // Finally reject if still erroring, Test
      return Axios.post(refreshURL, JSON.stringify({
        refresh_token: refreshToken,
      }))
        .then((result) => {
          const token = extractToken(result);
          store.dispatch(createAuth(token));
          const resp = error.response.config;
          resp.headers.Authorization = `Bearer ${token.token}`;
          return Axios(resp);
        })
        .catch((err) => {
          store.dispatch(removeAuth());
          return Promise.reject(err);
        });
    },
  );
};

export default interceptor;
