import React from 'react'
import ErrorModal from './ErrorModal'
import utils from '../utils/utils'
import md5 from 'js-md5'

class Profile extends React.Component {
    constructor(...args){
  		super(...args)
  		this.state = {
  			openName: false,
  			openEmail: false,
  			openPassword: false,
        openErrorModal: false,
        errorTitle: ""
      }
      this.user = {
        name: this.props.args.user.name,
        email: this.props.args.user.email,
        password: "",
        oldPassword: this.props.args.user.password,
        avatar: this.props.args.user.avatar
      }

      this.change = this.change.bind(this)
      this.updateField = this.updateField.bind(this)
      this.update = this.update.bind(this)
      this.uploadPhoto = this.uploadPhoto.bind(this)
      this.readerLoad = this.readerLoad.bind(this)
      this.loadPhoto = this.loadPhoto.bind(this)
      this.updatePhoto = this.updatePhoto.bind(this)
      this.openErrorModal = this.openErrorModal.bind(this)
      this.closeErrorModal = this.closeErrorModal.bind(this)
	  }

    componentDidMount() {
      this.loadPhoto()
    }

    unsetOpen(opened) {
		  return () => this.setState({[opened] : false})
    }

   toggleOpen(opened) {
      return () => this.setState({[opened] : !this.state[opened]})
   }

   change(e) {
     const name = e.target.name
     if(!this.testField(name, e.target.value))
        e.target.classList.add('btn-err')
     else
        e.target.classList.remove('btn-err')

   }

   testField(name, value) {
     switch (name) {
       case "name":
          return utils.testName(value)
       case "password":
          return utils.testPass(value)
       case "email":
          return utils.testEmail(value)
       default:
          return false
     }
   }

   update() {
     this.props.actions.updateProfile({name: this.user.name,
                                       email: this.user.email,
                                       password: (this.user.password === "") ? this.user.oldPassword : md5(this.user.password),
                                       avatar: this.user.avatar,
                                       ident: this.props.args.user.ident,
                                       id: this.props.args.user.id
     }).catch( err => this.openErrorModal(err))
   }

   updateField(e){
     e.preventDefault()
     const name = e.target.name
     const newValue = document.querySelector(`.form-control[name='${name}']`).value
     if(this.testField(name, newValue)) {
        this.user[name] = newValue
        this.update()
        this.unsetOpen("open"+ name.charAt(0).toUpperCase() + name.slice(1))()
      }
   }

   uploadPhoto(e) {
  		const reader = new FileReader()
      reader.onload = this.readerLoad
      reader.readAsDataURL(e.target.files[0])
   }

   loadPhoto(){
       if(this.user.avatar !==  '') {
         const photoContainer = document.querySelector('.profile-pic-container')
         photoContainer.style.backgroundImage = 'url('+this.user.avatar+')'
         photoContainer.style.backgroundSize = 'cover'
         photoContainer.classList.remove('profile-no-pic')
       }
   }

   readerLoad(e) {
     this.user.avatar = e.target.result
     this.loadPhoto()

// TODO: put this call somewhere else
      this.updatePhoto()
   }

   updatePhoto() {
       this.props.actions.updatePhoto({name: this.user.name,
                                       email: this.user.email,
                                       password: (this.user.password === "") ? this.user.oldPassword : md5(this.user.password),
                                       avatar: this.user.avatar,
                                       ident: this.props.args.user.ident,
                                       id: this.props.args.user.id
       }).catch( err => this.openErrorModal(err))
   }

   openErrorModal(error){
       this.setState({openErrorModal: true, errorTitle: error.message})
   }

   closeErrorModal(e){
     e.preventDefault()
     this.setState({openErrorModal: false})
   }

   render() {
	   	return (
		  <div className='profile' >
		  <h1 className='profile-title'> PROFILE </h1>

			<div className='profile-pic-row'>
				<div className='profile-pic-container profile-no-pic'>
					<input type='file' className='profile-pic-input' onChange={this.uploadPhoto}/>
				</div>

				<div className='profile-name-container'>
					<h4> Name: </h4>
					<div className='sup'  onClick={this.toggleOpen("openName")}  > </div>
					<div className={(this.state.openName ? "display-none ":"")+"name-text"} > {this.user.name} </div>
					<div className={(!this.state.openName ? "display-none ":"") + "name-input-container"} >
						<input type='text' className='form-control' name='name' defaultValue={this.user.name} onChange={this.change}/>
						<input type='submit' className='btn' name='name' onClick={this.updateField} value="Save"/>
					</div>
				</div>

			</div>

			<div className='profile-email-container'>
				<h4> Email: </h4>
				<div className='sup' onClick={this.toggleOpen("openEmail")} > </div>
				<div className={(this.state.openEmail ? "display-none ":"")+"email-text"}> {this.user.email}</div>
          <div className={(!this.state.openEmail ? "display-none ":"") + "email-input-container"}>
          <input type='email' className='form-control' name='email' defaultValue={this.user.email} onChange={this.change}/>
					<input type='submit' className='btn' name='email' onClick={this.updateField} value="Save"/>
				</div>
			</div>

		  <div className='profile-pass-container'>
				<h4> New password: </h4>
				<div className='sup' onClick={this.toggleOpen("openPassword")} > </div>
				<div className={(this.state.openPassword ? "display-none ":"")+"pass-text"}> {this.user.password} </div>
				<div className={(!this.state.openPassword ? "display-none ":"") + "pass-input-container"}>
					<input type='password' className='form-control' name='password' defaultValue={this.user.password} onChange={this.change} />
					<input type='submit' className='btn' name='password' onClick={this.updateField} value="Save"/>
				</div>
		  </div>

      <ErrorModal  args={{title: this.state.errorTitle,
                          closeModal: this.closeErrorModal,
                          isOpen: this.state.openErrorModal}} />
    </div>
	  )
  }
}

export default Profile
