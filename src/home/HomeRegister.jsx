import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

// Basic register component
function HomeRegister() {
  return (
    <Segment id="register-segment" padded="very">
      <Header as="h2" textAlign="center">
        New to the site?
      </Header>
      <Link to="/register">
        <Button id="typical-button">
          Register now
        </Button>
      </Link>
    </Segment>
  );
}

export default HomeRegister;
