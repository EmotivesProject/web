import axios from 'axios';

import {
  setLoading,
  notificationsLoaded,
  apiError,
  apiSuccess,
  seenNotification,
} from './actions';

const apiHost = process.env.REACT_APP_API_HOST;
const urlBase = process.env.REACT_APP_NOTIF_BASE_URL;

const getNotificationsRequest = (auth, page) => async (dispatch) => {
  dispatch(setLoading(true));
  const usersURL = `${apiHost}://${urlBase}/notification?page=${page}`;
  await axios.get(usersURL, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then((result) => {
      dispatch(apiSuccess('notifications'));
      dispatch(notificationsLoaded(result.data.result, page));
      dispatch(setLoading(false));
    })
    .catch(() => {
      dispatch(apiError('notifications'));
      dispatch(setLoading(false));
    });
};

const seenNotificationsRequest = (auth, id) => async (dispatch) => {
  const usersURL = `${apiHost}://${urlBase}/notification/${id}`;
  await axios.post(usersURL, {}, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then(() => {
      dispatch(seenNotification(id));
      dispatch(apiSuccess('notifications'));
    })
    .catch(() => {
      dispatch(apiError('notifications'));
    });
};

const visitNotificationsRequest = (auth, url) => async (dispatch) => {
  const usersURL = `${apiHost}://${urlBase}/notification/link/username/${auth.username}`;

  const body = JSON.stringify({ url });

  await axios.post(usersURL, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then(() => {
      dispatch(apiSuccess('notifications'));
      window.location.href = url;
    })
    .catch(() => {
      dispatch(apiError('notifications'));
    });
};

export { getNotificationsRequest, seenNotificationsRequest, visitNotificationsRequest };
