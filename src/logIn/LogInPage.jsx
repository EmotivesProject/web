import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import LogInForm from '../shared/LogInForm';
import getAuth from '../auth/selector';
import useWindowDimensions from '../shared/useWindowDimensions';

// Basic login page uses the LogInForm
const LogInPage = ({ auth }) => {
  // If the user is authenticated do not show this page
  if (auth !== null) {
    return <Redirect to="/feed" />;
  }

  const { width } = useWindowDimensions();

  const middleWidth = width < 1700 ? 12 : null;
  const sideWidths = middleWidth ? 2 : null;

  return (
    <div role="main">
      <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={3}>
          <Grid.Column width={sideWidths} />
          <Grid.Column width={middleWidth}>
            <LogInForm />
          </Grid.Column>
          <Grid.Column width={sideWidths} />
        </Grid.Row>
      </Grid>
    </div>
  );
};

// Connect up only the auth state and no dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(LogInPage);
