import auth from '../auth/authentication'
import utils from '../utils/utils'

class DrawApi {

  // TODO: implement draw process logic
  static postDraw(data) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders());
    const request = new Request(`http://localhost:3000/api/users/${data.uid}/drawing`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })

    return fetch(request).then(response => {
      return response.json()
    }).catch(error => {
      return error
    })
  }
}

export default DrawApi
