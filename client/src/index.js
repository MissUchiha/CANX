import React from 'react'
import ReactDOM from 'react-dom'
import routes from './router'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import auth from './auth/authentication'

let createdStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

createdStore.subscribe(() => {
  console.log(createdStore.getState())
  const state = createdStore.getState()

  if(state.user !== undefined && Object.keys(state.user).length !== 0)
    auth.saveUserState(state.user)
});


ReactDOM.render(
  <Provider store={createdStore}>
		<Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
