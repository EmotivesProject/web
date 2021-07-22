import Axios from 'axios';
import { createAuth, removeAuth } from '../auth/actions';
import { extractToken } from './extractObjects';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_UACL_BASE_URL;
const refreshURL = `${host}://${base}/refresh`;

const interceptor = (store) => {
  const intercept = Axios.interceptors.response.use(
    (next) => Promise.resolve(next),
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        console.log('weqweqwe');
        return Promise.reject(error);
      }

      Axios.interceptors.response.eject(intercept);

      const { authState } = store.getState();
      const { refreshToken } = authState;

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
