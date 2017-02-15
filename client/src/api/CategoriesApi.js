import auth from '../auth/authentication'
import utils from '../utils/utils'

class CategoriesApi {

  static getAllCategories() {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())
    const request = new Request(`http://localhost:3000/api/categories`, {
      method: 'GET',
      headers: headers
    })
    return fetch(request).then(response => {
      return response.json().then( res =>
          res.map((cat) => { return {name: cat.name, value: cat.letters.join("")}})
    )}).catch(error => {
      return error
    })
  }
}

export default CategoriesApi
