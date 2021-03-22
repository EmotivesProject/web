import axios from 'axios';
import React, { Component } from 'react';
import {
  Button, Form, Header, Segment, Message,
} from 'semantic-ui-react';
import setToken from '../utils/auth';

const HttpCodes = {
  success: 201,
  notFound: 404,
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      NameError: '',
      Email: '',
      EmailError: '',
      Password: '',
      PasswordError: '',
      GeneralError: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      NameError: '',
      EmailError: '',
      PasswordError: '',
      GeneralError: '',
    });

    const data = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_UACL_BASE_URL;
    const url = `${host}://${base}/uacl/user`;

    axios.post(url,
      JSON.stringify({
        name: data.Name,
        email: data.Email,
        password: data.Password,
      }),
      { 'Content-Type': 'application/json' })
      .then((result) => {
        if (result.status === HttpCodes.success) {
          setToken(result.data.result.token);
          window.location.href = '/';
        } else {
          this.setState({ GeneralError: 'Can\'t seem to register at the moment' });
        }
      })
      .catch((err) => {
        const responseMessages = err.response.data.message;
        if (responseMessages) {
          responseMessages.forEach((mess) => {
            if (mess.target) {
              this.setState({ [`${mess.target}Error`]: mess.message });
            } else {
              this.setState({ GeneralError: mess.message });
            }
          });
        } else {
          this.setState({ GeneralError: 'Can\'t seem to register at the moment' });
        }
      });
  }

  render() {
    const {
      Name,
      NameError,
      Email,
      EmailError,
      Password,
      PasswordError,
      GeneralError,
    } = this.state;

    return (
      <div>
        <Header as="h1" textAlign="center">
          Create an account
        </Header>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Segment>
            <label htmlFor="name">
              Full name
              <span style={{ color: 'red' }}>
                <Form.Input
                  id="name"
                  name="Name"
                  type="input"
                  icon="user"
                  iconPosition="left"
                  size="large"
                  placeholder="Your full name"
                  required
                  value={Name}
                  onChange={this.handleChange}
                  min="3"
                  max="100"
                />
                {NameError}
              </span>
            </label>
            <br />
            <label htmlFor="email">
              Email
              <span style={{ color: 'red' }}>
                <Form.Input
                  id="email"
                  name="Email"
                  type="email"
                  icon="mail"
                  iconPosition="left"
                  size="large"
                  placeholder="E-mail address"
                  required
                  value={Email}
                  onChange={this.handleChange}
                  min="3"
                  max="100"
                />
                {EmailError}
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
            {GeneralError ? <Message color="red">{GeneralError}</Message> : <div />}
            <Button primary size="large">
              Register now
            </Button>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
