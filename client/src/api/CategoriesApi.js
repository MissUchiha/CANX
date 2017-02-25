import auth from '../auth/authentication'
import utils from '../utils/utils'

class CategoriesApi {

  static getAllCategories() {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())
    const request = new Request(`http://192.168.1.173:3000/api/category`, {
      method: 'GET',
      headers: headers
    })
    return fetch(request).then(response => {
      if(response.status >= 200 && response.status < 300)
      return response.json().then( res =>
        res.map(cat => { return {name: cat.name, value: cat.letters.join("") } } )
      )
      else
        throw new Error("Cannot fetch categories.")
    })
  }
}

export default CategoriesApi
