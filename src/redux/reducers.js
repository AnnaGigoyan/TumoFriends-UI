import { combineReducers } from 'redux';

// TODO: update user reducer for logi, profile update, and logout
const user = (state = {data: null, error: null}, action) => {
  switch (action.type) {
    /**
     * TODO: add reducer for 
     * 1. LOGIN
     * 2. LOGIN_ERROR
     * 3. UPDATE
     * 4. UPDATE_ERROR 
     * 5. LOGOUT
     */   
    case "LOGIN_USER":
      return {data: action.payload, error: null};
    case "LOGIN_USER_ERROR":
      return {data: null, error: action.payload}  
    case 'CREATE_USER':
      return { data: action.payload, error: null};
    case 'CREATE_USER_ERROR':
      return { data: null, error: action.payload};
      case 'LOGOUT_USER':
      return { data: null, error: null}
    default:
      return state
  }
}

// TODO: reducer for networking with peer - start/stop chat
const network = (state = {withUser: null, receiver: false}, action) => {
  switch(action.type) {
    /**
     * TODO: add reducer for
     * 1. Starting Chat
     * 2. Stopping Chat
     * 3. Logging out user
     */
    default:
      return state;
  }
}

export default combineReducers({
 user,
 network,
});