import * as types from './actionTypes'
import categoriesApi from '../api/CategoriesApi'

export function loadCategoriesSuccess(categories) {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories}
}

export function loadCategories() {
  return function(dispatch) {
    return categoriesApi.getAllCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories))
    }).catch(error => {
      throw(error)
    })
  }
}
