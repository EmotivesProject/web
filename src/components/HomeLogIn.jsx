import { Component, React } from 'react';
import axios from 'axios';
import {
  Button, Form, Header, Segment,
} from 'semantic-ui-react';

class HomeLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
    };
  }

  handleChangeEmail = (event) => {
    this.setState({ Email: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ Password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = this.state;

    axios.post('http://uacl.localhost/uacl/login',
      JSON.stringify({
        email: data.Email,
        password: data.Password,
      }),
      { 'Content-Type': 'application/json' })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(`NOT GOOD ${error}`);
      });
  }

  render() {
    const { Email, Password } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Log in
        </Header>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <label htmlFor="email">
              Email
              <Form.Input id="email" type="email" icon="user" iconPosition="left" size="large" placeholder="E-mail address" required value={Email} onChange={this.handleChangeEmail} />
            </label>
            <label htmlFor="password">
              Password
              <Form.Input id="password" value={Password} onChange={this.handleChangePassword} icon="lock" iconPosition="left" size="large" placeholder="Password" type="password" required />
            </label>
            <br />
            <Button primary> Login </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default HomeLogIn;
