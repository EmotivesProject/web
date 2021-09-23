import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import { removeAuth } from '../auth/actions';

// Basic log out page
const LogOutPage = ({
  auth, callRemoveAuth,
}) => {
  // If the user is not authenticated do not show this page
  if (auth === null) {
    return <Redirect to="/" />;
  }

  // Basically just call the log out dispatch
  callRemoveAuth();
  window.location.reload();

  return (
    <>
      <TopBar />
      <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={3}>
          <Grid.Column width={5} />
          <Grid.Column width={5}>
            <h1>
              Logging out...
            </h1>
          </Grid.Column>
          <Grid.Column width={5} />
        </Grid.Row>
      </Grid>
    </>
  );
};

// Connect up only the auth state and no dispatch
const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

const mapDispatchToProps = (dispatch) => ({
  callRemoveAuth: () => dispatch(removeAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogOutPage);
