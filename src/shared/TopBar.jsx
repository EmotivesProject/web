import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

const TopBar = () => (
  <Segment fixed="top" id="top-bar">
    <Grid columns={4}>
      <Grid.Column>
        <Link to="/feed">
          Emotives
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/feed">
          Home
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/messenger">
          Messages
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/notifications">
          Notifications
        </Link>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default TopBar;
