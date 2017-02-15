import React from 'react'
import Header from './Header'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import * as categoriesActions from '../actions/categoriesActions'
import auth from '../auth/authentication'

class MainLayout extends React.Component {

    componentWillMount() {
      this.props.categoriesActions.loadCategories()
      let rememberedUser = auth.getRememberedUser()
      if(rememberedUser){
        this.props.userActions.storeRememberedUser(rememberedUser)
      }
    }

    render() {
      return (
    	  <div>
    			<Header />
    			<div className='footer-back'></div>
    			{this.props.children}
  	   </div>
     )
   }
}


function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    categoriesActions: bindActionCreators(categoriesActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(MainLayout)
