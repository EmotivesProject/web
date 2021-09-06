import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import getAuth from '../auth/selector';

// Basic housing component for the RegisterForm component
const RegisterPage = ({ auth }) => {
  // Don't show this page if auth is set
  if (auth !== null) {
    return <Redirect to="/feed" />;
  }

  return (
    <div role="main">
      <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={1}>
          <Grid.Column width={5}>
            <RegisterForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

// Connect up the auth
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(RegisterPage);
