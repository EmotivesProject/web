import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

const TopBar = () => (
  <Segment fixed="top" id="top-bar" role="banner">
    <Grid columns={6}>
      <Grid.Column>
        Emotives
      </Grid.Column>
      <Grid.Column>
        <Link to="/feed" tabIndex="0">
          Home
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/explore" tabIndex="0">
          Explore
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/messenger" tabIndex="0">
          Messages
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/notifications" tabIndex="0">
          Notifications
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/log_out" tabIndex="0">
          Log Out
        </Link>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default TopBar;
