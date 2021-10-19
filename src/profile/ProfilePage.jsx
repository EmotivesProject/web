import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Grid, Message } from 'semantic-ui-react';
import getAuth from '../auth/selector';
import TopBar from '../shared/TopBar';
import useWindowDimensions from '../shared/useWindowDimensions';
import { PictureComponent } from './PictureComponent';

export const ProfilePage = ({
  auth,
}) => {
  const { width } = useWindowDimensions();

  if (auth === null) {
    return <Redirect to="/" />;
  }

  const [error] = React.useState(null);

  const errorMessage = error !== null ? (
    <Message negative>
      <Message.Header>Error occurred</Message.Header>
      <p>
        An error occurred around&nbsp;
        {error}
        &nbsp;try again or refresh
      </p>
    </Message>
  ) : null;

  const middleWidth = width < 1700 ? 12 : null;
  const sideWidths = middleWidth ? 2 : null;

  return (
    <>
      <TopBar />
      <Grid role="main" id="main">
        <Grid.Row columns="three">
          <Grid.Column width={sideWidths} />
          <Grid.Column width={middleWidth}>
            {errorMessage}
            <h1>Profile</h1>
            <PictureComponent auth={auth} key={Math.random().toString(36).substr(2, 9)} />
          </Grid.Column>
          <Grid.Column width={sideWidths} />
        </Grid.Row>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuth(state),
});

export default connect(mapStateToProps, null)(ProfilePage);
