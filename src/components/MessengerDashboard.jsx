import { React } from 'react';
import {
  Header, Grid,
} from 'semantic-ui-react';

const host = process.env.REACT_APP_API_HOST;
const base = process.env.REACT_APP_CHATTER_BASE_URL;

ws = new WebSocket("")

function MessengerDashboard() {
  return (
    <div>
      <Header as="h2" textAlign="center">
        Messenger Dashboard
      </Header>
      <div>
        <Grid textAlign="center" divided="vertically" verticalAlign="middle">
          <Grid.Row columns={3}>
            <Grid.Column width={3}>
              Hey
            </Grid.Column>
            <Grid.Column width={6}>
              hey
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

export default MessengerDashboard;
