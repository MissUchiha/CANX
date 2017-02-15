import { connect } from 'react-redux'
import Profile from '../views/Profile'
import * as userActions from '../actions/userActions'
import {bindActionCreators} from 'redux'

function mapStateToProps(state, ownProps) {
  return {
      args : {
          user: state.user
       }
     }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer
