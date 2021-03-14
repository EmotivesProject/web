import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Grid textAlign="center" divided="vertically" verticalAlign="middle">
      <Grid.Row columns={2}>
        <Grid.Column width={2}>
          <Link to="/about">
            About us
          </Link>
        </Grid.Column>
        <Grid.Column width={2}>
          <Link to="/terms">
            Terms and conditions
          </Link>
        </Grid.Column>
        <Grid.Column width={2}>
          <Link to="/privacy">
            Privacy policy
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Footer;
