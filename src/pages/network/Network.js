import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import './network.css'
import Socket from '../../socket';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import VideoChat from './VideoChat'
import 'react-chat-widget/lib/styles.css';

//import logo from './logo.svg';

/**
 * Main React Component for the networking page (WYSIWIG, Chat, Video, Canvas)
 */
class NetworkPage extends Component {
  constructor(props) {
     super(props);
     this.state = {}
   }
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    Socket.connect(user => {
      user.emit('message',newMessage, this.props.withUser)
    })
    
  }

  componentDidMount() {
    Socket.connect(user => {
      user.on('new message', msg => {
        addResponseMessage(msg);
      });
    });
  }
  componentWillUnmount() {
    // TODO: cleanup listeners for chat/editor sockets
  }
  render() {
    return (
      <Container fluid={true} className="p-0">
        { 
          <div className="App">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            //profileAvatar={logo}
            title="Chat "
            subtitle="Say Hi to friend"
          />
        </div>
        } 
        <Row noGutters={true}>
          <Col>
            <span>TODO: add tabs for Canvas and WYSIWIG</span>
            { 
              // TODO: add tabs for Canvas and WYSIWIG }
            }
          </Col>
          <Col>
            <div>
              {
              <VideoChat 
            user = {this.props.user }
            caller={this.props.receiver ? this.props.withUser : this.props.user} 
            receiver={this.props.receiver ? this.props.user : this.props}
            
              />}</div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default NetworkPage;
