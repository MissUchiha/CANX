import React from 'react'
import Modal from 'react-modal'
import {modalStyle} from '../style/modalStyle'
import utils from '../utils/utils'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as registerActions from '../actions/userActions'
import md5 from 'js-md5'

class Register extends React.Component {
    constructor(...args) {
      super(...args)
      this.state = {
        openModal: false
      }
      this.user = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.onBlur = this.onBlur.bind(this)
      this.onChange = this.onChange.bind(this)
      this.createUser = this.createUser.bind(this)
    }

    openModal(e) {
      e.preventDefault()
      this.setState({openModal: true})
    }

    closeModal() {
      this.setState({openModal: false})
    }

    createUser(ev) {
        ev.preventDefault()
        if(utils.testName(this.user.name) && utils.testEmail(this.user.email) && utils.testPass(this.user.password) && utils.testConfirmPass(this.user.password, this.user.confirmPassword))
          this.props.actions.register({ name: this.user.name,
                                        email: this.user.email,
                                        password: md5(this.user.password),
                                        avatar: "",
                                        ident: ""
          })

        this.closeModal()
    }

    testField(name, value) {
      const field = document.querySelector(`.form-control[name='${name}']`)

      switch (name) {
        case "name":
          if(utils.testName(value) === false){
            field.classList.add('btn-err')
            return false
          }
          break
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
        case "confirmPassword":
          if(utils.testConfirmPass(value, this.user.password) === false){
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
      let name = ev.target.name
      let value = ev.target.value

      if(!this.testField(name,value))
        return false

      this.user[name] = value
    }

   render() {
     	return (
    		<div>
    			<h1> REGISTER </h1>
    			<form>
    				<div className='form-group sign-group'>
    						<label> Name and surname: </label>
    						<input type='text'
                       name='name'
                       onBlur={this.onBlur}
                       onChange={this.onChange}
                       className='form-control'
                       autoFocus />
    				</div>
    				<div className='form-group sign-group'>
    						<label> Email: </label>
    						<input type='email'
                       name='email'
                       onBlur={this.onBlur}
                       onChange={this.onChange}
                       className='form-control'/>
    				</div>
    				<div className='form-group sign-group'>
    						<label> Password: </label>
    						<input type='password'
                       name='password'
                       onBlur={this.onBlur}
                       onChange={this.onChange}
                       className='form-control'/>
    				</div>
    				<div className='form-group sign-group'>
    						<label> Confirm password: </label>
    						<input type='password'
                       name='confirmPassword'
                       onBlur={this.onBlur}
                       onChange={this.onChange}
                       className='form-control'/>
    				</div>
    				<input type='submit'
                   onClick={this.openModal}
                   onTouchStart={this.openModal}
                   className='btn form-group login-btn sign-group'
                   value='REGISTER' />
    			</form>

          <Modal isOpen={this.state.openModal}
                 onRequestClose={this.closeModal}
                 contentLabel="Register"
                 shouldCloseOnOverlayClick={true}
                 style={modalStyle}>
            <ul className='modal-register-list'>
              <li> Name: {this.user.name} </li>
              <li> Email: {this.user.email} </li>
              <li> Password length: {this.user.password.length} </li>
            </ul>
            <div className='modal-register-title'> Are you sure? </div>
            <button className='modal-yes  modal-check' onTouchStart={this.createUser} onClick={this.createUser}> </button>
            <button className='modal-no  modal-close' onTouchStart={this.closeModal} onClick={this.closeModal}> </button>
          </Modal>
    		</div>
        )
      }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(registerActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Register)
