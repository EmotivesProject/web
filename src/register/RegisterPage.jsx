import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import getAuth from '../auth/selector';
import useWindowDimensions from '../shared/useWindowDimensions';

// Basic housing component for the RegisterForm component
const RegisterPage = ({ auth }) => {
  // Don't show this page if auth is set
  if (auth !== null) {
    return <Redirect to="/feed" />;
  }

  const { width } = useWindowDimensions();

  const middleWidth = width < 1700 ? 12 : null;
  const sideWidths = middleWidth ? 2 : null;

  return (
    <div role="main">
      <Grid textAlign="center" style={{ height: '90vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={3}>
          <Grid.Column width={sideWidths} />
          <Grid.Column width={middleWidth}>
            <RegisterForm />
          </Grid.Column>
          <Grid.Column width={sideWidths} />
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
