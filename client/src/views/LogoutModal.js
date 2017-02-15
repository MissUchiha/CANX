import React from 'react'
import Modal from 'react-modal'
import {modalStyle} from '../style/modalStyle'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../actions/userActions'

class LogoutModal extends React.Component {
  constructor(...args) {
    super(...args)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.actions.logOutUser();
  }

  render() {
    return (
    <Modal isOpen={this.props.args.isOpen}
           onRequestClose={this.props.args.closeModal}
           contentLabel="Logout"
           shouldCloseOnOverlayClick={true}
           style={modalStyle}>
      <h2> Are you sure? </h2>
      <button className='modal-yes  modal-check' value='Yes' onClick={this.logout}> </button>
      <button className='modal-no  modal-close' value='No' onClick={this.props.args.closeModal}></button>
    </Modal>
  )}
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LogoutModal)
