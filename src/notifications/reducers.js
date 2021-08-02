import {
  SET_LOADING,
  NOTIFICATIONS_LOADED,
  API_ERROR,
  API_SUCCESS,
  SEEN_NOTIFICATION,
} from './actions';

const initialState = {
  notifications: [],
  page: 0,
  loading: false,
  errors: null,
};

const notificationState = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING: {
      const { loadingState } = payload;
      return {
        ...state,
        loading: loadingState,
      };
    }
    case NOTIFICATIONS_LOADED: {
      const { notifications, page } = payload;
      const notifs = state.notifications.concat(notifications);
      const newPage = page + 1;
      return {
        ...state,
        notifications: notifs,
        page: newPage,
      };
    }
    case SEEN_NOTIFICATION: {
      const { id } = payload;
      const currentNotifs = state.notifications;
      currentNotifs.filter((x) => x.id !== id);
      return {
        ...state,
        notifications: currentNotifs,
      };
    }
    case API_ERROR: {
      const { name } = payload;
      return {
        ...state,
        errors: name,
      };
    }
    case API_SUCCESS: {
      return {
        ...state,
        errors: null,
      };
    }
    default:
      return state;
  }
};

export default notificationState;
