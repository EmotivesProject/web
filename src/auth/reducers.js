import Cookies from 'js-cookie';
import {
  CREATE_AUTH,
  UPDATE_AUTH,
  REMOVE_AUTH,
} from './actions';

function setAuthToken(auth) {
  Cookies.set('user', auth.username, { SameSite: 'None', Secure: true });
  Cookies.set('token', auth.token, { SameSite: 'None', Secure: true });
  Cookies.set('refresh_token', auth.refreshToken, { SameSite: 'None', Secure: true });
}

function removeAuthToken() {
  Cookies.remove('user');
  Cookies.remove('token');
  Cookies.remove('refresh_token');
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
      setAuthToken(auth);
      return {
        auth,
      };
    }
    case UPDATE_AUTH: {
      const { auth } = payload;
      setAuthToken(auth);
      return {
        auth,
      };
    }
    case REMOVE_AUTH: {
      removeAuthToken();
      return {};
    }
    default:
      return state;
  }
};

export default authState;
