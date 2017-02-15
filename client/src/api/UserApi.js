import auth from '../auth/authentication'
import utils from '../utils/utils'

class UserApi {

  static register(user) {
    const headers = utils.getTypeHeaders()
    const request = new Request(`http://localhost:3000/auth/registration`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user)
    })

    return fetch(request).then(response => {
      const jwt = response.headers.get("authorization")
      return response.json().then((res) => Object.assign({user: res, jwt})) })
                            .catch(error => { return error })
  }

  static login(credentials) {
    const headers = utils.getTypeHeaders()
    const request = new Request(`http://localhost:3000/auth/credentials`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(credentials)
    })

    return fetch(request).then(response => {
      const jwt = response.headers.get("authorization")
      return response.json().then((res) => Object.assign({ user: res, jwt }) )
    }).catch(error => {
      return error
    })
  }

  static update(user) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())
    const request = new Request(`http://localhost:3000/api/users/${user.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(user)
    })

    return fetch(request).then(response => {
      return response
    }).catch(error => {
      return error
    })
  }

  static updatePhoto(user) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())
    const tokens = user.avatar.match(/data:(.*)\/(.*);base64,(.*)/)
    const body = { format: tokens[2] ,
                   content: tokens[3]}
    const request = new Request(`http://localhost:3000/api/users/${user.id}/avatar`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    })

    return fetch(request).then(response => {
      return response.json().then((r) => r.avatar)
    }).catch(error => {
      return error
    })
  }
}

export default UserApi
