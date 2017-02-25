import React from 'react'
import Modal from 'react-modal'
import {modalStyle} from '../style/modalStyle'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import md5 from 'js-md5'
import * as userActions from '../actions/userActions'
import utils from '../utils/utils'

class Login extends React.Component {
    constructor(...args) {
      super(...args)

      this.state = {
        openModal: false
      }

      this.credentials = {
        email: "",
        password: ""
      }

      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.testField = this.testField.bind(this)
      this.onBlur = this.onBlur.bind(this)
      this.onChange = this.onChange.bind(this)
      this.login = this.login.bind(this)
    }

    openModal(e) {
      e.preventDefault()
      this.setState({openModal: true})
    }

    closeModal() {
      this.setState({openModal: false})
    }

    testField(name, value) {
      const field = document.querySelector(`.form-control[name='${name}']`)

      switch (name) {
        case "email":
          if(utils.testEmail(value) === false){
            field.classList.add('btn-err')
            return false
          }
          break
        case "password":
          if(utils.testPass(value) === false){
            field.classList.add('btn-err')
            return false
          }
          break
       default:
          return false
      }

      field.classList.remove('btn-err')
      return true
    }

    onChange(ev) {
      return this.testField(ev.target.name, ev.target.value)
    }

    onBlur(ev) {
      const name = ev.target.name
      const value = ev.target.value

      if(!this.testField(name,value))
        return false

      this.credentials[name] = value
    }

    login(ev) {
        ev.preventDefault()
        // ev.stopPropagation()
        if(utils.testEmail(this.credentials.email) && utils.testPass(this.credentials.password)){
          this.props.actions.loginUser({ email: this.credentials.email,
                                         password: md5(this.credentials.password)
          })
        }
    }

   	render() {
        return (
      		<div>
      			<h1> LOGIN </h1>
      			<form>
      				<div className='form-group sign-group'>
      					<label> Email: </label>
      					<input type='email'
                       name='email'
                       onBlur={this.onBlur}
                       onChange={this.onChange}
                       className='form-control'
                       autoFocus />
      				</div>
      				<div className='form-group sign-group'>
      					<label> Password: </label>
      					<input type='password'
                       name='password'
                       onBlur={this.onBlur}
                       onChange={this.onChange}
                       className='form-control'/>
      				</div>
      				<input type='submit'
                     className='btn form-group login-btn sign-group'
                     value='LOGIN'
                     onClick={this.login}
                    //  onTouchEnd={this.login}
                     />
      			</form>
            <Modal isOpen={this.state.openModal}
                   onRequestClose={this.closeModal}
                   contentLabel="Login"
                   shouldCloseOnOverlayClick={true}
                   style={modalStyle}>
              <div className='modal-register-title'> LOGIN FAILED! </div>
              <button className='modal-ok ' onClick={this.closeModal}> </button>
            </Modal>
      		</div>
      )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Login)
