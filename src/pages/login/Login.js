import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap';
import './login.css';
/**
 * Component for Login Page
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    
 this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = event => {
    event.preventDefault();
    this.props.loginUser(this.state)
  }
 
  

  render() {
  
    if (this.props.user) {
      return (
        <Redirect to={{
          pathname: '/profile',
        }} />
      )
    }
   
    
    return (
      <Container className="mt-3">
      <h1 className="heading">Login</h1>
      <Form onSubmit={this.handleSubmit } className="form" > 
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onChange={e => this.setState({email: e.target.value})}  type="email" placeholder="Enter email"  />
    <Form.Text value={() => this.state.email} className="text-muted">
    Login with your TUMO username and password.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <hr />
  <p className="h5">Don't have an account? <a className="text" href="/signup">Sign-up to connect!</a></p>
</Form>
      </Container>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  user: PropTypes.object,
  userError: PropTypes.string,
}