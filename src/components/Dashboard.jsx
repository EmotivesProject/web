import { React } from 'react';
import {
  Header, Grid,
} from 'semantic-ui-react';

import Feed from './Feed';

function Dashboard() {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Dashboard
      </Header>
      <div>
        <Grid textAlign="center" divided="vertically" verticalAlign="middle">
          <Grid.Row columns={3}>
            <Grid.Column width={3}>
              Hey
            </Grid.Column>
            <Grid.Column width={6}>
              <Feed />
            </Grid.Column>
            <Grid.Column width={3}>
              Hey
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}

export default Dashboard;
