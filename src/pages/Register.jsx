import React from 'react';
import { Grid } from 'semantic-ui-react';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

function Register() {
  return (
    <div>
      <Grid textAlign="center" style={{ height: '75vh' }} divided="vertically" verticalAlign="middle">
        <Grid.Row columns={1}>
          <Grid.Column width={5}>
            <RegisterForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer />
    </div>
  );
}

export default Register;
