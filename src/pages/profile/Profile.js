import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';

/**
 * React component for Profile page
 */
export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: "No Data"
    }
  }
  handleSubmit(e) {
    // TODO: EXTRA WORK - handle form submit (if doing updates)
  }
  handleChange(type, value) {
    // TODO: EXTRA WORK - handle form change to set state (if doing updates)
  }

  render() {
    // TODO: use to redirect to home page if user not logged in
    if (this.props.user == null) {
      return (
        <Redirect to={{
          pathname: '/',
        }} />
      )
    }
    return (
      <Container className="mt-5">
        <Row>
          <Col className="mx-auto">
            <h1 className="my-3 text-center">Profile</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={this.props.user.email} type="email" placeholder="Enter email" required/>
              </Form.Group>

              <Form.Group controlId="formFName">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={this.props.user.firstName} type="text" placeholder="Enter First Name" required/>
              </Form.Group>

              <Form.Group controlId="formLName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={this.props.user.lastName} type="text" placeholder="Enter Last Name" required/>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value={this.props.user.password} type="password" placeholder="Password" required/>
              </Form.Group>

              <Form.Group controlId="formLearningTargets">
                <Form.Label>Learning Targets</Form.Label>
                <Form.Control as="select" multiple value={this.props.user.learningTargets}>
                  <option value="Animation">Animation</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Filmmakink">Filmmaking</option>
                  <option value="Web Development">Web Development</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control as="select" value={this.props.user.location}>
                  <option value="Yerevan">Yerevan</option>
                  <option value="Gyumri">Gyumri</option>
                  <option value="Stepanakert">Stepanakert</option>
                  <option value="Dilijan">Dilijan</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button> 
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

Profile.propTypes = {
  updateUser: PropTypes.func,
  user: PropTypes.object,
  userError: PropTypes.string,
}
