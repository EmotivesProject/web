const getNotifications = (state) => state.notificationState.notifications;
const getPage = (state) => state.notificationState.page;
const getLoading = (state) => state.notificationState.loading;
const getError = (state) => state.notificationState.errors;

export {
  getNotifications,
  getPage,
  getLoading,
  getError,
};
