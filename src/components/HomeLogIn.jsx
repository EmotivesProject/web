import { Component, React } from 'react';
import axios from 'axios';
import {
  Button, Form, Header, Segment,
} from 'semantic-ui-react';
import setToken from '../utils/auth';

require('dotenv').config();

const HttpCodes = {
  success: 201,
  notFound: 404,
};

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

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_API_BASE_URL;
    const url = `${host}://${base}/uacl/login`;

    axios.post(url,
      JSON.stringify({
        email: data.Email,
        password: data.Password,
      }),
      { 'Content-Type': 'application/json' })
      .then((result) => {
        if (result.status === HttpCodes.success) {
          setToken(result.data.result.token);

          const { refreshCurrent } = this.props;
          if (refreshCurrent) {
            window.location.reload(false);
          } else {
            window.location.href = '/';
          }
        } else {
          console.log('Failed to sign in');
        }
      })
      .catch((error) => {
        // Show can't sign in at the moment message
        console.log(error);
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
              <Form.Input id="email" type="email" icon="mail" iconPosition="left" size="large" placeholder="E-mail address" required value={Email} onChange={this.handleChangeEmail} />
            </label>
            <br />
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
