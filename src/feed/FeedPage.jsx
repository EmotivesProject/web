import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';

const FeedPage = ({ auth }) => {
  if (auth === null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <TopBar />
      Feed
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(FeedPage);
