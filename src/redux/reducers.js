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
   
      case 'START_CHAT':
        return { ...state, withUser: action.withUser }
      case 'IM_THE_RECEIVE':
        return { ...state, receiver: true }
      case 'STOP_CHAT':
      case 'LOGOUT_USER':
        return { withUser: null, receiver: false }
      default:
        return state;
    
     
   
  }
}

export default combineReducers({
 user,
 network,
});