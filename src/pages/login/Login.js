import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './login.css'
// TODO: use --> import {Redirect} from 'react-router-dom';

import {Form, Button , Container} from 'react-bootstrap';
/**
 * Component for Login Page
 */
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '' ,
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleSubmit(event){
    alert('A name was submitted:' + this.state.email
  );
  event.preventDefault();
  }
  // constructor(props) {
    // TODO: set state and form handlers
  // }
  
      
     render() {
    // TODO: use to redirect if user not logged in
    // if (this.props.user) {
    //   return (
    //     <Redirect to={{
    //       pathname: '/profile',
    //     }} />
    //   )
    // }
    return (
      <Container className="mt-3">
      <h1 class="display-4 text-secondary">Login</h1>
      <Form class ="form" onSubmit={this.handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} />
        <Form.Text className="text-muted">
        Login with your TUMO username and password.
        </Form.Text>
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={this.handleChange} />
      </Form.Group>
      <Form.Group controlId="formBasicChecbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <hr />
  <p className="h5">Don't have an account? <a className="text-decoration-none text-light font-weight-bold bg-primary" href="/signup">Sign-up to connect!</a></p>
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
