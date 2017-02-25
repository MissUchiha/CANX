import auth from '../auth/authentication'
import utils from '../utils/utils'

class UserApi {

  static register(user) {
    const headers = utils.getTypeHeaders()
    const request = new Request(`http://192.168.1.173:3000/api/user/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(user)
    })

    return fetch(request).then(response => {
      if(response.status >= 200 && response.status < 300)
        return response.json().then(res => res)
      else
        throw new Error("Cannot create user.")
    })
  }

  static login(credentials) {
    const headers = utils.getTypeHeaders()
    const request = new Request(`http://192.168.1.173:3000/api/user/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(credentials)
    })

    return fetch(request).then(response => {
      if(response.status >= 200 && response.status < 300)
        return response.json().then(res => res)
      else
        throw new Error("Cannot login user.")
    })
  }
  static update(user) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())
    const request = new Request(`http://192.168.1.173:3000/api/user/${user.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(user)
    })

    return fetch(request).then(response => {
      if(response.status >= 200 && response.status < 300)
        return response.json().then(res => res)
      else
        throw new Error("Cannot update user.")
    })
  }

  static updatePhoto(user) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())
    const tokens = user.avatar.match(/data:(.*)\/(.*);base64,(.*)/)
    const body = { format: tokens[2] ,
                   content: tokens[3]}
    const request = new Request(`http://192.168.1.173:3000/api/user/${user.id}/avatar`, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: headers
    })

    return fetch(request).then(response => {
      if(response.status >= 200 && response.status < 300)
        return response.json().then(res => res.avatar)
      else
        throw new Error("Cannot upload user photo.")
    })
  }
}

export default UserApi
