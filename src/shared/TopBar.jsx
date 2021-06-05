import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Grid,
  Segment,
} from 'semantic-ui-react';

const TopBar = () => (
  <Segment fixed="top" id="top-bar">
    <Grid columns={5}>
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
        Post Notifications
      </Grid.Column>
      <Grid.Column>
        Messages Notifications
      </Grid.Column>
    </Grid>
  </Segment>
);

export default TopBar;

/**
    <Menu.Item as="a" header>
      Emotives
    </Menu.Item>
    <Link to="/feed">
      <Menu.Item>Home</Menu.Item>
    </Link>
    <Link to="/messenger">
      <Menu.Item>Messenger</Menu.Item>
    </Link>
    <Menu.Menu position="right">
      <Menu.Item as="a">Notifications</Menu.Item>
      <Menu.Item as="a">Instant Messages</Menu.Item>
    </Menu.Menu>
*/
