export const API_ERROR = 'API_ERROR';
export const apiError = (name) => ({
  type: API_ERROR,
  payload: { name },
});

export const API_SUCCESS = 'API_SUCCESS';
export const apiSuccess = (name) => ({
  type: API_SUCCESS,
  payload: { name },
});

export const SET_LOADING = 'SET_LOADING';
export const setLoading = (loadingState) => ({
  type: SET_LOADING,
  payload: { loadingState },
});

export const NOTIFICATIONS_LOADED = 'NOTIFICATIONS_LOADED';
export const notificationsLoaded = (notifications, page) => ({
  type: NOTIFICATIONS_LOADED,
  payload: { notifications, page },
});

export const SEEN_NOTIFICATION = 'SEEN_NOTIFICATION';
export const seenNotification = (id) => ({
  type: SEEN_NOTIFICATION,
  payload: { id },
});
