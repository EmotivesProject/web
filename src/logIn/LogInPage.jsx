import React from 'react';
import { Grid } from 'semantic-ui-react';
import LogInForm from '../shared/LogInForm';

const LogInPage = () => (
  <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
    <Grid.Row columns={3}>
      <Grid.Column width={5} />
      <Grid.Column width={5}>
        <LogInForm />
      </Grid.Column>
      <Grid.Column width={5} />
    </Grid.Row>
  </Grid>
);

export default LogInPage;
