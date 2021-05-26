import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import getAuth from '../auth/selector';

const MessengerPage = ({ auth }) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      Messenger
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(MessengerPage);
