import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

import Home from './pages/home/Home';
import Login from './pages/login/LoginContainer';
import Signup from './pages/signup/SignupContainer';
import Profile from './pages/profile/ProfileContainer';
import Search from './pages/search/SearchContainer';
import Network from './pages/network/NetworkContainer';

import './App.css';
import {loginUser} from './redux/actions';

import NavigationBar from './components/NavigationBar/NavigationBarContainer';

class App extends Component {
  componentDidMount() {
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    
    if(email && password){
      this.props.loginUser(email,password);
    }
    
  }
  render() {
    return (
      <Router>
        <NavigationBar {...this.props}  />
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/search" component={Search} />
        <Route path="/network" component={Network} />
        <Route path="/profile" component={Profile} />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user:state.user.data
})

const mapDispatchToProps = dispatch => ({
  
    loginUser: (email, password) => {
      dispatch(loginUser(email,password));
    
  }
})

export default process.env.NODE_ENV === "development" ? 
  hot(connect(mapStateToProps, mapDispatchToProps)(App)) : 
  connect(mapStateToProps, mapDispatchToProps)(App);
