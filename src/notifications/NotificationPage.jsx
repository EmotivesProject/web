import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';

const NotificationPage = ({ auth }) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <TopBar />
      <Grid>
        <Grid.Row columns="three">
          <Grid.Column />
          <Grid.Column>
            <h1>Notifications</h1>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(NotificationPage);
