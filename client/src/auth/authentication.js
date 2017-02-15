class Auth {
  static login(user, jwt) {
    if(user !== undefined && jwt !== undefined && jwt.length !== 0 && Object.keys(user).length !== 0) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('jwt', jwt)
    }
  }

  static loggedIn() {
    return !!localStorage.jwt
  }

  static logOut() {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
  }

  static authHeaders() {
    return {'AUTHORIZATION': `Bearer ${localStorage.jwt}`}
  }

  static getRememberedUser() {
    return (!localStorage.user) ? null : JSON.parse(localStorage.user)
  }

  static saveUserState(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export default Auth
