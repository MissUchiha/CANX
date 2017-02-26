import auth from '../auth/authentication'
import utils from '../utils/utils'
import FetchApi from './FetchApi'

class UserApi {

  static register(user) {
    const headers = utils.getTypeHeaders()

		return FetchApi.post({ path: 'api/user/register',
													body: JSON.stringify(user),
		 											headers})
									 .then(response => {
								      if(response.status >= 200 && response.status < 300)
								        return response.json().then(res => res)
								      else
								        throw new Error("Cannot create user.")
    })
  }

  static login(credentials) {
    const headers = utils.getTypeHeaders()


		return FetchApi.post({ path: 'api/user/login',
													body: JSON.stringify(credentials),
		 											headers})
									 .then(response => {
								      if(response.status >= 200 && response.status < 300)
								        return response.json().then(res => res)
								      else
								        throw new Error("Cannot login user.")
    })
  }

  static update(user) {
    const headers = Object.assign(utils.getTypeHeaders(), auth.authHeaders())

		return FetchApi.put({ path: `api/user/${user.id}`,
													body: JSON.stringify(user),
		 											headers})
									 .then(response => {
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

		return FetchApi.put({ path: `api/user/${user.id}/avatar`,
													body: JSON.stringify(body),
		 											headers})
									 .then(response => {
								      if(response.status >= 200 && response.status < 300)
								        return response.json().then(res => res.avatar)
								      else
								        throw new Error("Cannot upload user photo.")
    })
  }
}

export default UserApi
