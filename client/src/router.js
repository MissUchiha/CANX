import React from 'react'
import { Route, IndexRoute } from 'react-router'

// Containers
import LetterContainer from './containers/LetterContainer'
import CategoryContainer from './containers/CategoryContainer'
import ProfileContainer from './containers/ProfileContainer'
import CategoriesContainer from './containers/CategoriesContainer'

// Views
import Login from './views/Login'
import Home from './views/Home'
import MainLayout from './views/MainLayout'
import IndexPage from './views/IndexPage'
import Register from './views/Register'
import Help from './views/Help'
import NotFound from './views/NotFound'

// Auth
import auth from './auth/authentication'

// Style
import './style/style.css'

export default (
			<Route path='/'>
				<IndexRoute component={IndexPage} onEnter={requireNotAuth}/>
				<Route component={MainLayout} onEnter={requireAuth}>
						<Route path='/home' component={Home}/>
						<Route path='/categories'>
								<IndexRoute component={CategoriesContainer}/>
								<Route path='/categories/:category' component={CategoryContainer} />
								<Route path='/categories/:category/letters/:letter' component={LetterContainer} />
						</Route>
						<Route path='/profile' component={ProfileContainer}/>
						<Route path='/help' component={Help} />
				</Route>
				<Route path='/login' component={Login} onEnter={requireNotAuth}/>
				<Route path='/register' component={Register} onEnter={requireNotAuth}/>
				<Route path='/userResources/*' />

				<Route path='*' component={NotFound} />
			</Route>
)

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function requireNotAuth(nextState, replace) {
  if (auth.loggedIn()) {
    replace({
      pathname: '/home',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
