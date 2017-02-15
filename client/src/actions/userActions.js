import * as types from './actionTypes'
import UserApi from '../api/UserApi'
import auth from '../auth/authentication'

export function registerSuccess(user) {
  return {type: types.REGISTER_SUCCESS, user}
}

export function register(user) {
  return function (dispatch) {
    return UserApi.register(user).then(response => {
      auth.login(response.user, response.jwt)
      dispatch(registerSuccess(response.user))
    }).catch(error => {
      throw(error)
    })
  }
}

export function loginSuccess(credentials) {
  return {type: types.LOG_IN_SUCCESS, credentials}
}

export function loginUser(credentials) {
  return function(dispatch) {
    return UserApi.login(credentials).then(response => {
      auth.login(response.user, response.jwt)
      dispatch(loginSuccess(response.user))
    }).catch(error => {
      throw(error)
    })
  }
}

export function logOutSuccess() {
  return {type: types.LOG_OUT_SUCCESS}
}

export function logOutUser() {
  return function(dispatch) {
      auth.logOut()
      return dispatch(logOutSuccess())
    }
}

export function updateProfileSuccess(user) {
  return {type: types.UPDATE_PROFILE_SUCCESS, user}
}

export function updateProfile(user) {
  return function (dispatch) {
    return UserApi.update(user).then(res => {
        dispatch(updateProfileSuccess(user))
    }).catch(error => {
      throw(error)
    })
  }
}

export function updatePhotoSuccess(user) {
  return {type: types.UPDATE_PHOTO_SUCCESS, user}
}

export function updatePhoto(user) {
  return function (dispatch) {
    return UserApi.updatePhoto(user).then(res => {
        const avatarPath = "http://localhost:3000" + res + "?v=" + parseInt(Math.random()*100000, 10)
        dispatch(updatePhotoSuccess(Object.assign(user, {avatar: avatarPath})))
    }).catch(error => {
      throw(error)
    })
  }
}

export function storeRememberedUserSuccess(user) {
  return {type: types.STORE_REMEMBERED_USER, user}
}

export function storeRememberedUser(user) {
  return function (dispatch) {
    let promisse = new Promise((resolve, reject) => resolve(user) )
    return promisse.then((user) => {
      dispatch(storeRememberedUserSuccess(user))
    }).catch(error => {
      throw(error)
    })
  }
}
