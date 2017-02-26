import auth from '../auth/authentication'
import utils from '../utils/utils'
import FetchApi from './FetchApi'

class DrawApi {

  static postDraw(data) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders());
		console.log(data)
    return FetchApi.post({ path: `api/user/${data.uid}/drawing`,
													body: JSON.stringify(data),
		 											headers})
									 .then(response => {
								      if(response.status >= 200 && response.status < 300)
								        return response.json().then(res => res)
								      else
								        throw new Error("Cannot send drawing.")
    })
  }
}

export default DrawApi
