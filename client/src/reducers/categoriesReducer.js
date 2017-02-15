import * as types from '../actions/actionTypes'

export default function categoriesReducer(state = {}, action) {
  switch(action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return Object.assign([],  action.categories)
    default:
      return state
  }
}
