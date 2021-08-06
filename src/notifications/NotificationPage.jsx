import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Grid, Message } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import {
  getError, getLoading, getNotifications, getPage,
} from './selector';
import { getNotificationsRequest, seenNotificationsRequest } from './thunks';
import Notification from './Notification';

let initialized = false;

const NotificationPage = ({
  auth,
  notifications,
  error,
  loadNotifications,
  seenNotification,
  page,
}) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }
  console.log(notifications);

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

  return (
    <div>
      <TopBar />
      <Grid>
        <Grid.Row columns="three">
          <Grid.Column />
          <Grid.Column>
            {errorMessage}
            <h1>Notifications</h1>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                data={notification}
                action={seenNotification}
              />
            ))}
            <Button
              id="load-more-posts"
              onClick={loadMoreNotifications}
              positive
            >
              Load More
            </Button>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
  notifications: getNotifications(state),
  page: getPage(state),
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadNotifications: (auth, page) => dispatch(getNotificationsRequest(auth, page)),
  seenNotification: (auth, id) => dispatch(seenNotificationsRequest(auth, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPage);
