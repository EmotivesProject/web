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
  finished: false,
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
      let notifs = [];
      let newPage = 0;
      let finished = false;
      if (notifications != null && notifications.length === 5) {
        notifs = state.notifications.concat(notifications);
        newPage = page + 1;
      } else if (notifications.length !== 5) {
        notifs = state.notifications.concat(notifications);
        newPage = page + 1;
        finished = true;
      } else {
        finished = true;
        notifs = state.notifications;
      }
      return {
        ...state,
        notifications: notifs,
        page: newPage,
        finished,
      };
    }
    case SEEN_NOTIFICATION: {
      const { id } = payload;
      const currentNotifs = state.notifications;
      const seenIndex = currentNotifs.findIndex((notif) => notif.id === id);
      if (seenIndex !== -1) {
        currentNotifs[seenIndex].seen = true;
      }
      return {
        ...state,
        notifications: [...currentNotifs],
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
