import Socket from '../socket';

const apiHost = process.env.REACT_APP_API_HOST  || 'http://localhost:3001';
const axios = require('axios');

export const createUser = (email, password, firstName, lastName, learningTargets, location) => {
  return dispatch => {
    const user = {
      email,
      password,
      firstName,
      lastName,
      learningTargets,
      location
    };
    axios.post(`${apiHost}/students`, user)
    .then(response => {
      dispatch({
        type: 'CREATE_USER',
        payload: response.data
      })
    })
    .catch(err => {

      dispatch({
        type: 'CREATE_USER_ERROR',
        payload: getErrorMessage(err)
      })
    })
  }
}

export const loginUser = (email, password) => {
  return dispatch => {
    //console.log(`${apiHost}/students/${email}`);
    axios.get(`${apiHost}/students/${email}`, {auth: {username: email, password: password}})
    .then(response => {
      sessionStorage.setItem('email',email);
      sessionStorage.setItem('password',password);
      Socket.connect(users => {
        users.emit('login', {
          email,
          password
        })
        users.on('start-chat', fromUser => {
          // console.log('start-chat', fromUser);
          startChat(fromUser)(dispatch);
          dispatch(imReceiver());
        });
        dispatch({
          type: "LOGIN_USER",
          payload: response.data
        })
      })
      //console.log(response.data);
      
  })
  .catch(err => {
    dispatch({
      type:"LOGIN_USER_ERROR",
      payload:getErrorMessage(err)
    })
  })
    /**
     * TODO: Login Action
     * 1. Call Login API
     * 2. Set Session Storage
     * 3. Connect to Socket and emit login
     * 4. Dispatch action LOGIN_USER.
     * 5. Listen on Socket start-chat to dispatch start-chat
     */
    }
  };

export const updateUser = () => {
  return dispatch => {
    /**
     * TODO: Update User action
     * 1. Call Update User API
     * 2. Dispatch action
     */
  }
}

export const logoutUser = (user) => {
  return dispatch => {
    Socket.users.emit('logout', user);
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    dispatch({
      type: 'LOGOUT_USER',
    })
  }
}

export const imReceiver = () => ({
  type: 'IM_THE_RECEIVE',
})


export const startChat = (withUser) => {
  return dispatch => {
    dispatch({
      type: 'START_CHAT',
      withUser,
    });
  };
}

export const stopChat = () => {
  // TODO: action creator to stop chat
}

// Use helper function to parse error message from API
function getErrorMessage(err) {
  let message = null;
  if (err.response) {
    message = err.response.data.error || err.response.data;
  } else if (err.request) {
    message = "No response from backend service.";
  } else {
    message = err.message;
  }
  console.log(err);
  return message;
}
