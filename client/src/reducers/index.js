import {combineReducers} from 'redux'
import user from './userReducer'
import categories from './categoriesReducer'
import draw from './drawReducer'

const rootReducer = combineReducers({
  // short hand property names
  user,
  categories,
  draw
})

export default rootReducer
