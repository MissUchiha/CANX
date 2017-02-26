const host = "http://192.168.1.173:3000"

class FetchApi {

	static get({path, headers}){
		const request = new Request(`${host}/${path}`, {
			method: 'GET',
			headers
		})
		return fetch(request)
	}

	static post({path, headers, body}){
		const request = new Request(`${host}/${path}`, {
			method: 'POST',
			headers,
			body
		})
		return fetch(request)
	}

	static put({path, headers, body}){
		const request = new Request(`${host}/${path}`, {
			method: 'PUT',
			headers,
			body
		})
		return fetch(request)
	}

	static delete({path, headers, body}){
		const request = new Request(`${host}/${path}`, {
			method: 'DELETE',
			headers,
			body
		})
		return fetch(request)
	}
}

export default FetchApi
