import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
} from 'semantic-ui-react';

// TODO clean up the <br>s

const TopBar = () => (
  <>
    <Menu fixed="top" inverted borderless>
      <Container>
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
      </Container>
    </Menu>
    <br />
    <br />
  </>
);

export default TopBar;
