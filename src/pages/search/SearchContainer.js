import { connect } from 'react-redux'
import {startChat} from '../../redux/actions'
import Search from './Search';

const mapStateToProps = state => ({
  user: state.user.data,
  userError: state.user.error
})

const mapDispatchToProps = dispatch => ({
  startChat: (withUser) => {
    dispatch(startChat(withUser));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);