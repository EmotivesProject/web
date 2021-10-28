import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Grid, Message } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import {
  getError, getFinished, getLoading, getNotifications, getPage,
} from './selector';
import { getNotificationsRequest, seenNotificationsRequest, visitNotificationsRequest } from './thunks';
import Notification from './Notification';
import useWindowDimensions from '../shared/useWindowDimensions';

let initialized = false;

export const NotificationPage = ({
  auth,
  notifications,
  error,
  finished,
  loadNotifications,
  seenNotification,
  page,
  visitNotification,
  loading,
}) => {
  const { width } = useWindowDimensions();

  if (auth === null) {
    return <Redirect to="/" />;
  }

  if (!initialized) {
    loadNotifications(auth, page);
    initialized = true;
  }

  const loadMoreNotifications = () => {
    loadNotifications(auth, page);
  };

  const errorMessage = error !== null ? (
    <Message negative>
      <Message.Header>Error occurred</Message.Header>
      <p>
        An error occurred around&nbsp;
        {error}
        &nbsp;try again or refresh
      </p>
    </Message>
  ) : null;

  const button = !finished ? (
    <Button
      id="load-more-posts"
      onClick={loadMoreNotifications}
      loading={loading}
      disabled={loading}
      content="Load more"
      icon="plus"
    />
  ) : null;

  const middleWidth = width < 1700 ? 12 : null;
  const sideWidths = middleWidth ? 2 : null;

  return (
    <>
      <TopBar />
      <Grid role="main" id="main">
        <Grid.Row columns="three">
          <Grid.Column width={sideWidths} />
          <Grid.Column width={middleWidth}>
            {errorMessage}
            <h1>Notifications</h1>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                data={notification}
                action={seenNotification}
                auth={auth}
                visitAction={visitNotification}
              />
            ))}
            {button}
          </Grid.Column>
          <Grid.Column width={sideWidths} />
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  notifications: getNotifications(state),
  finished: getFinished(state),
  page: getPage(state),
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadNotifications: (auth, page) => dispatch(getNotificationsRequest(auth, page)),
  seenNotification: (auth, id) => dispatch(seenNotificationsRequest(auth, id)),
  visitNotification: (auth, url) => dispatch(visitNotificationsRequest(auth, url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
