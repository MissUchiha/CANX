import React from 'react'
import Modal from 'react-modal'
import {modalStyle} from '../style/modalStyle'

function ErrorModal(props) {
    return (
      <Modal isOpen={props.args.isOpen}
           onRequestClose={props.args.closeModal}
           contentLabel="Error"
           shouldCloseOnOverlayClick={true}
           style={modalStyle}>
      <h2> {props.args.title} </h2>
      <button className='modal-ok  modal-close' value='Close' onClick={props.args.closeModal}></button>
    </Modal>
  )
}

export default ErrorModal
