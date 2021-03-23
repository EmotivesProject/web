import { Component, React } from 'react';
import axios from 'axios';
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import { setToken } from '../utils/auth';

require('dotenv').config();

const HttpCodes = {
  success: 201,
  notFound: 404,
  unprocessable: 422,
};

class HomeLogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      UsernameError: '',
      Password: '',
      PasswordError: '',
      LogInError: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      UsernameError: '',
      PasswordError: '',
      LogInError: '',
    });

    const data = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/login`;

    axios.post(url,
      JSON.stringify({
        username: data.Username,
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
        }
      })
      .catch((err) => {
        const responseMessages = err.response.data.message;
        if (responseMessages) {
          responseMessages.forEach((mess) => {
            if (mess.target) {
              this.setState({ [`${mess.target}Error`]: mess.message });
            } else {
              this.setState({ LogInError: mess.message });
            }
          });
        } else {
          this.setState({ LogInError: 'Can\'t seem to sign in the moment' });
        }
      });
  }

  render() {
    const {
      Username,
      UsernameError,
      Password,
      PasswordError,
      LogInError,
    } = this.state;

    return (
      <div>
        <Header as="h2" textAlign="center">
          Log in
        </Header>
        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <label htmlFor="username">
              Username
              <span style={{ color: 'red' }}>
                <Form.Input
                  id="username"
                  name="Username"
                  type="input"
                  icon="user"
                  iconPosition="left"
                  size="large"
                  placeholder="Username"
                  required
                  value={Username}
                  onChange={this.handleChange}
                  min="3"
                  max="100"
                />
                {UsernameError}
              </span>
            </label>
            <br />
            <label htmlFor="password">
              Password
              <span style={{ color: 'red' }}>
                <Form.Input
                  id="password"
                  name="Password"
                  value={Password}
                  onChange={this.handleChange}
                  icon="lock"
                  iconPosition="left"
                  size="large"
                  placeholder="Password"
                  type="password"
                  required
                  min="6"
                  max="100"
                />
                {PasswordError}
              </span>
            </label>
            <br />
            {LogInError ? <Message color="red">{LogInError}</Message> : <div />}
            <Button primary> Login </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default HomeLogIn;
