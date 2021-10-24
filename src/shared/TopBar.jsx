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
        <Link to="/feed" aria-label="Go Home" tabIndex="0">
          <Icon name="home" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/explore" aria-label="Explore" tabIndex="0">
          <Icon name="map" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/messenger" aria-label="Messenger" tabIndex="0">
          <Icon name="comments" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/notifications" aria-label="Notification" tabIndex="0">
          <Icon name="bell" />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Link to="/profile" aria-label="user" tabIndex="0">
          <Icon name="user" />
        </Link>
      </Grid.Column>
    </Grid>
  </Segment>
);

export default TopBar;
