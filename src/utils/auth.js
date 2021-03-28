import Cookies from 'js-cookie';

export function getToken(key) {
  return Cookies.get(key);
}

export function setToken(key, token) {
  Cookies.set(key, token);
}

export function removeToken() {
  Cookies.remove('auth');
  Cookies.remove('user');
}
