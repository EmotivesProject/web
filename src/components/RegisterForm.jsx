import axios from 'axios';
import React, { Component } from 'react';
import {
  Button, Form, Header, Segment,
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
      Email: '',
      Password: '',
    };
  }

  handleChangeName = (event) => {
    this.setState({ Name: event.target.value });
  }

  handleChangeEmail = (event) => {
    this.setState({ Email: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ Password: event.target.value });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const data = this.state;

    const host = process.env.REACT_APP_API_HOST;
    const base = process.env.REACT_APP_API_BASE_URL;
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
          console.log('Failed to register');
        }
      })
      .catch((error) => {
        console.log(`NOT GOOD ${error}`);
      });
  }

  render() {
    const { Name, Email, Password } = this.state;

    return (
      <div>
        <Header as="h1" textAlign="center">
          Create an account
        </Header>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Segment>
            <label htmlFor="name">
              Full name
              <Form.Input id="name" name="Name" type="input" icon="user" iconPosition="left" size="large" placeholder="Your full name" required value={Name} onChange={this.handleChange} />
            </label>
            <br />
            <label htmlFor="email">
              Email
              <Form.Input id="email" name="Email" type="email" icon="mail" iconPosition="left" size="large" placeholder="E-mail address" required value={Email} onChange={this.handleChangeEmail} />
            </label>
            <br />
            <label htmlFor="password">
              Password
              <Form.Input id="password" name="Password" value={Password} onChange={this.handleChangePassword} icon="lock" iconPosition="left" size="large" placeholder="Password" type="password" required />
            </label>
            <br />
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
