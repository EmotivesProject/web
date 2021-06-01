import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import HomeRegister from './HomeRegister';
import LogInForm from '../shared/LogInForm';
import getAuth from '../auth/selector';
import logo from '../assets/EmotivesLogo.svg';

const HomePage = ({ auth }) => {
  if (auth !== null) {
    return <Redirect to="/feed" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
      <Grid.Row columns={3}>
        <Grid.Column width={5}>
          <img src={logo} alt="emotives" />
        </Grid.Column>
        <Grid.Column width={5}>
          <LogInForm />
        </Grid.Column>
        <Grid.Column width={5}>
          <HomeRegister />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(HomePage);
