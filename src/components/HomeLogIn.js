import { Component } from 'react';
import axios from 'axios'
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';

class HomeLogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
			Email: '',
			Password: '',
		}
	}

  handleChangeEmail = event => {
    this.setState({ Email: event.target.value })
  }

  handleChangePassword = event => {
    this.setState({ Password: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios.post('http://uacl.localhost/uacl/login',
      JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
      }),
      { 'Content-Type': 'application/json' }
    )
      .then(result => {
        console.log(result)
      })
	  .catch(
		  function (error) {
			  console.log("NOT GOOD " + error)
		  }
	  )
	}

  render() {
  	return (
		  <div>
  	    <Header as='h2' textAlign='center'>
  	      Log in
  	    </Header>
		  <Segment>
  	      <Form onSubmit={this.handleSubmit}>
  	        <label>Email</label>
  	        <Form.Input icon='user' iconPosition='left' size='large' placeholder='E-mail address' required value={this.state.Email} onChange={this.handleChangeEmail} />
			  <label>Password</label>
  	        <Form.Input
			  value={this.state.Password} onChange={this.handleChangePassword}
			  	icon='lock'
				iconPosition='left'
			  	size='large'
  	          placeholder='Password'
  	          type='password'
				required
  	        />

  	        <Button primary>
  	          Login
  	        </Button>
  	      </Form>
		  </Segment>
		  </div>
  	);
  }
}

export default HomeLogIn;
