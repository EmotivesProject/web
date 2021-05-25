import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import HomeRegister from './HomeRegister';
import HomeLoginForm from './HomeLoginForm';

const HomePage = () => (
  <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
    <Grid.Row columns={3}>
      <Grid.Column width={5}>
        <Header as="h1">
          emotives
        </Header>
      </Grid.Column>
      <Grid.Column width={5}>
        <HomeLoginForm />
      </Grid.Column>
      <Grid.Column width={5}>
        <HomeRegister />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HomePage;