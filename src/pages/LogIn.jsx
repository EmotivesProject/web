import React from 'react';
import { Grid } from 'semantic-ui-react';
import HomeLogIn from '../components/HomeLogIn';
import Footer from '../components/Footer';

function LogIn() {
  return (
    <div>
      <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={1}>
          <Grid.Column width={5}>
            <HomeLogIn refreshCurrent={false} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
    </div>
  );
}

export default LogIn;
