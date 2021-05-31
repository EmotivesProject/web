import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import getAuth from '../auth/selector';

const RegisterPage = ({ auth }) => {
  if (auth !== null) {
    return <Redirect to="/feed" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
      <Grid.Row columns={1}>
        <Grid.Column width={5}>
          <RegisterForm />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(RegisterPage);
