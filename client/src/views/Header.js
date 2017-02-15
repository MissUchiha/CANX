import React from 'react'
import {Link} from 'react-router'
import LogoutModal from './LogoutModal'

// TODO: borders merge when navigation uncollapse

class Header extends React.Component {
  constructor(...args) {
		super(...args)
		this.state = {
			open: false,
      openLogoutModal: false
		}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
	}

	toggleOpen() {
		return () => this.setState({open: !this.state.open})
	}

  openModal() {
	 	this.setState({openLogoutModal: true, open: false})
	}

	closeModal() {
		this.setState({openLogoutModal: false, open: false})
	}

	render() {
		return (
      <div className="header container">
			  <div className="row">
					<Link to='/home'><div className="header-left col-xs-3"> CANX </div> </Link>
					<div className="header-right col-xs-2 col-xs-offset-7" onClick={()=> this.setState({open: !this.state.open})}>
						<div className={(this.state.open ? 'header-right-open' : 'header-right-closed') + ' header-right-into'} > </div>
					</div>
  			</div>
	      <div className={"collapsable " + (this.state.open ? 'uncolapse' : 'colapse')}>
  	      <Link to='/categories' onClick={this.toggleOpen()}> <div className='nav-bar'><span className='nav-icon categories-icon'></span> DRAW </div></Link>
    			<Link to='/profile' onClick={this.toggleOpen()}> <div className='nav-bar'><span className='nav-icon profile-icon'></span>  PROFILE </div></Link>
    			<Link to='/help' onClick={this.toggleOpen()}> <div className='nav-bar'><span className='nav-icon help-icon'></span>  HELP </div></Link>
    			<div className='nav-bar' onClick={this.openModal}><span className='nav-icon logout-icon'></span>  LOGOUT </div>
          <div className={this.state.open ? 'clear-dropdown' : ''}> </div>
		    </div>

        <LogoutModal args={{openModal: this.openModal,
                           closeModal: this.closeModal,
                           isOpen: this.state.openLogoutModal}} />
   		</div>
	) }
}

export default Header
