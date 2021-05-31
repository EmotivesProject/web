import { Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';

function HomeRegister() {
  return (
    <>
      <Header as="h2" textAlign="center">
        New to the site?
      </Header>
      <Link to="/register">
        <Button positive>
          Register now
        </Button>
      </Link>
    </>
  );
}

export default HomeRegister;
