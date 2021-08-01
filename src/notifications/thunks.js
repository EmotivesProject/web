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
  console.log(page);
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
    })
    .catch(() => {
      dispatch(apiError('notifications'));
    });
};

const seenNotificationsRequest = (auth, id) => async (dispatch) => {
  const usersURL = `${apiHost}://${urlBase}/notification/${id}`;
  await axios.post(usersURL, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  })
    .then(() => {
      dispatch(apiSuccess('notifications'));
      dispatch(seenNotification(id));
    })
    .catch(() => {
      dispatch(apiError('notifications'));
    });
};

export { getNotificationsRequest, seenNotificationsRequest };
