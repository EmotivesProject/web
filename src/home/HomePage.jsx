import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import HomeRegister from './HomeRegister';
import LogInForm from '../shared/LogInForm';
import getAuth from '../auth/selector';
import logo from '../assets/EmotivesLogo.svg';
import useWindowDimensions from '../shared/useWindowDimensions';

const HomePage = ({ auth }) => {
  // If user is authenticated then redirect them to the feed
  if (auth !== null && auth.username !== undefined) {
    return <Redirect to="/feed" />;
  }

  const { width } = useWindowDimensions();

  const middleWidth = width < 1700 ? 12 : 5;

  return (
    <div role="main" id="main">
      <Grid textAlign="center" style={{ height: '75vh' }} verticalAlign="middle" stackable>
        <Grid.Column width={middleWidth}>
          <img src={logo} alt="emotives" />
        </Grid.Column>
        <Grid.Column width={middleWidth}>
          <LogInForm />
        </Grid.Column>
        <Grid.Column width={middleWidth}>
          <HomeRegister />
        </Grid.Column>
      </Grid>
    </div>
  );
};

// Connect up only the auth state and no dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(HomePage);
