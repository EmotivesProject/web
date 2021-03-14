import { Component, React } from 'react';
import {
  Button, Form, Header, Segment,
} from 'semantic-ui-react';

class Dashboard extends Component {
  handleSubmit = () => {
    localStorage.removeItem('auth');
    window.location.reload(false);
  }

  render() {
    return (
      <div>
        <Header as="h2" textAlign="center">
          Dashboard
        </Header>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Button primary> Log out </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default Dashboard;
