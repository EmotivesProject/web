import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import LogInForm from '../shared/LogInForm';
import getAuth from '../auth/selector';

// Basic login page uses the LogInForm
const LogInPage = ({ auth }) => {
  // If the user is authenticated do not show this page
  if (auth !== null) {
    return <Redirect to="/feed" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
      <Grid.Row columns={3}>
        <Grid.Column width={5} />
        <Grid.Column width={5}>
          <LogInForm />
        </Grid.Column>
        <Grid.Column width={5} />
      </Grid.Row>
    </Grid>
  );
};

// Connect up only the auth state and no dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(LogInPage);
