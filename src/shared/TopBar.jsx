import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Grid,
  Icon,
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
          <Icon name="home" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/explore" tabIndex="0">
          <Icon name="map" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/messenger" tabIndex="0">
          <Icon name="comments outline" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/notifications" tabIndex="0">
          <Icon name="bell outline" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/log_out" tabIndex="0">
          <Icon name="sign-out" />
        </Link>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default TopBar;
