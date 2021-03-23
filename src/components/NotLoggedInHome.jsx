import React from 'react';
import { Grid } from 'semantic-ui-react';
import HomeTag from './HomeTag';
import HomeLogIn from './HomeLogIn';
import HomeRegister from './HomeRegister';
import Footer from './Footer';

function NotLoggedInHome() {
  return (
    <div>
      <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            <HomeTag />
          </Grid.Column>
          <Grid.Column width={5}>
            <HomeLogIn refreshCurrent />
          </Grid.Column>
          <Grid.Column width={5}>
            <HomeRegister />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
    </div>
  );
}

export default NotLoggedInHome;
