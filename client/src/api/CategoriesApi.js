import auth from '../auth/authentication'
import utils from '../utils/utils'
import FetchApi from './FetchApi'

class CategoriesApi {

  static getAllCategories() {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())

    return FetchApi.get({ path: 'api/category', headers})
									 .then(response => {
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
