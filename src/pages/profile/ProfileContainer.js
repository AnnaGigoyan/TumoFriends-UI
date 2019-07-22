import { connect } from 'react-redux'

import Profile from './Profile';

const mapStateToProps = state => {
 return {
   user: state.user.data,
   userError:state.user.error
 };
}

const mapDispatchToProps = dispatch => {
  // TODO: EXTRA WORK - pass update user action 
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

