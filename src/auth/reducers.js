import Cookies from 'js-cookie';
import {
  CREATE_AUTH,
  UPDATE_AUTH,
  REMOVE_AUTH,
} from './actions';

function setAuthToken(username, token, refreshToken) {
  Cookies.set('user', username, { SameSite: 'Lax', Secure: true });
  Cookies.set('token', token, { SameSite: 'Lax', Secure: true });
  Cookies.set('refresh_token', refreshToken, { SameSite: 'Lax', Secure: true });
}

function removeAuthToken() {
  Cookies.remove('user', { SameSite: 'Lax', Secure: true });
  Cookies.remove('token', { SameSite: 'Lax', Secure: true });
  Cookies.remove('refresh_token', { SameSite: 'Lax', Secure: true });
}

function getAuthToken() {
  const user = Cookies.get('user');
  const token = Cookies.get('token');
  const refreshToken = Cookies.get('refresh_token');

  if (user === undefined || token === undefined || refreshToken === undefined) {
    return null;
  }

  return {
    user,
    token,
    refreshToken,
  };
}

const authState = (state = getAuthToken(), action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_AUTH: {
      const { auth } = payload;
      const { username, token, refreshToken } = auth;
      setAuthToken(username, token, refreshToken);
      return {
        username,
        token,
        refreshToken,
      };
    }
    case UPDATE_AUTH: {
      const { auth } = payload;
      const { username, token, refreshToken } = auth;
      setAuthToken(username, token, refreshToken);
      return {
        username,
        token,
        refreshToken,
      };
    }
    case REMOVE_AUTH: {
      removeAuthToken();
      return null;
    }
    default:
      return state;
  }
};

export default authState;
