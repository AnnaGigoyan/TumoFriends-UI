import React from 'react';
import LioWebRTC from 'liowebrtc';
import {Badge, Button} from 'react-bootstrap';
import endCallIcon from './end-call-icon.png';
import callIcon from './phone-call.png'
/**
 * VideoChat - WebRTC Workshop: will contain all the logic to start video chat with peer
 */
class VideoChat extends React.Component {
  constructor(props) {
    
      super(props);
      this.state = {
        nick: this.props.user ? props.user.firstName : null ,
        roomID: `tumochat${[props.caller.email, props.receiver.email].sort().join()}`,
        muted: true,
        camPaused: false,
        peers: [],
        inCall: false,
      };
      this.videoRef = React.createRef();
      this.remoteVideos = {};
  }
  componentDidMount() {
    this.webrtc = new LioWebRTC({
      // The url for your signaling server. Use your own in production!
      url: 'https://sm1.lio.app:443/',
      // The local video ref set within your render function
      localVideoEl: this.localVid,
      // Immediately request camera access
      autoRequestMedia: false,
      // Optional: nickname
      nick: this.state.nick,
      debug: true,
      localVideo:{
        mirror:false,
        muted:true,
      },
      stunservers: ['stun1.l.google.com:19302','stun2.l.google.com'],
      turnservers: ['ec2-54-213-136-50.us-west-2.compute.amazonaws.com']
    });

    this.webrtc.on('peerStreamAdded', this.addVideo);
    this.webrtc.on('removedPeer', this.removeVideo);
    //this.webrtc.on('ready', this.readyToJoin);
    this.webrtc.on('iceFailed', this.handleConnectionError);
    this.webrtc.on('connectivityError', this.handleConnectionError);
  }

  componentWillUnmount() {
    this.webrtc.disconnect();
  }
  addVideo = (stream, peer) => {
    this.setState({ peers: [...this.state.peers, peer] }, () => {
      this.webrtc.attachStream(stream, this.remoteVideos[peer.id], {mirror: false});
      this.setState({
        inCall: true

      });
    });
  }

  removeVideo = (peer) => {
    this.setState({
      peers: this.state.peers.filter(p => !p.closed)
    });
  }

  handleConnectionError = (peer) => {
    const pc = peer.pc;
    console.log('had local relay candidate', pc.hadLocalRelayCandidate);
    console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
  }
  startCall(){
   this.webrtc.startLocalVideo();
   this.readyToJoin();
  }
  stopCall (){
  this.webrtc.leaveRoom();
  this.readyToJoin({
    inCall: false
  })
  }
  readyToJoin = () => {
    // Starts the process of joining a room.
    this.webrtc.joinRoom(this.state.roomID, (err, desc) => {
    });
  }
  generateRemotes = () => this.state.peers.map((p) => (
    <div key={p.id}>
      <div id={/* The video container needs a special id */ `${this.webrtc.getContainerId(p)}`}>
        <video
          // Important: The video element needs both an id and ref
          id={this.webrtc.getDomId(p)}
          ref={(v) => this.remoteVideos[p.id] = v}
          />
      </div>
        <p>{p.nick}</p>
    </div>
    ));

    render() {
      return (
        <div>
          <div>
              <video
                height='auto'
                autoPlay
                controls
                ref={(vid) => { this.localVid = vid; }}
              />
              <p>{this.state.nick}</p>
          </div>
          <div className="position-absolute">
            <Button disabled={this.state.inCall ? true : null }
            variant="link" onClick={() => {this.startCall()}}>
              <img width="45px" src={callIcon} alt="call" />
              </Button>
              <Button disabled={this.state.inCall ? null : true}
              variant="link" onClick={() => {this.stopCall()}}>
                <img width="45px" src={endCallIcon} alt="Endcall" />

              </Button>
          </div>
          {this.generateRemotes()}
        </div>
      );
    }
  }
  


export default VideoChat;
