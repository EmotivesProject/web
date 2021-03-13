import React from 'react';
import {Grid} from 'semantic-ui-react';
import HomeTag from '../components/HomeTag';
import HomeLogIn from '../components/HomeLogIn';
import HomeRegister from '../components/HomeRegister';
import Footer from '../components/Footer';

function Home() {
  return (
	  <div>
  	<Grid textAlign='center' style={{height: '75vh'}} divided='vertically' verticalAlign='middle'>
        <Grid.Row columns={3}>
          <Grid.Column width={5}>
            <HomeTag />
          </Grid.Column>
          <Grid.Column width={5}>
            <HomeLogIn />
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

export default Home;
