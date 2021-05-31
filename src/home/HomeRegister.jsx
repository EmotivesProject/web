import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

function HomeRegister() {
  return (
    <Segment>
      <Header as="h2" textAlign="center">
        New to the site?
      </Header>
      <Link to="/register">
        <Button positive>
          Register now
        </Button>
      </Link>
    </Segment>
  );
}

export default HomeRegister;
