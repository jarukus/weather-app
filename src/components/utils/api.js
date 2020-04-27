import { stringify } from 'query-string'
import { _API_URL, _API_WEATHER_KEY } from '@/config'

export class ApiClient {
	constructor(baseUrl) {
		this.baseUrl = baseUrl || _API_URL
	}

	_request({ method, url, data, config = {} }) {
		return new Promise((resolve, reject) => {
			let payload = {
				method,
				headers: {
					...config.headers,
				},
				...config,
			}

			if (data) {
				if (payload.method === 'GET') {
					url += '?' + stringify(data)
				} else {
					payload.body = JSON.stringify(data)
				}
			}

			fetch(this.baseUrl + url + `&appid=${_API_WEATHER_KEY}`, payload)
				.then((response) => {
					if (response.cod === 401) {
						throw new Error('Error 401')
					}
					return response.json()
				})
				.then((json) => {
					if (json.cod >= 200 < 300) {
						resolve(json)
					} else {
						reject(json)
					}
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	get(url, params, config) {
		return this._request({
			method: 'GET',
			url,
			data: params,
			config,
		})
	}

	post(url, body, config) {
		return this._request({
			method: 'POST',
			url,
			data: body,
			config,
		})
	}

	put(url, body, config) {
		return this._request({
			method: 'PUT',
			url,
			data: body,
			config,
		})
	}

	patch(url, body, config) {
		return this._request({
			method: 'PATCH',
			url,
			data: body,
			config,
		})
	}

	delete(url, body, config) {
		return this._request({
			method: 'DELETE',
			url,
			data: body,
			config,
		})
	}
}
