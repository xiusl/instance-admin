import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_URL,
	timeout: 360000
})

service.interceptors.request.use(config => {
	if (config.method == 'get') {
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	} else {
		config.headers['Content-Type'] = 'application/json'
	}

	return config
}, error => {
	Promise.reject(error)
})

service.interceptors.response.use(response => {
	const res = response.data
	if (res['success']) {
		return res['result']
	} else {
		return Promise.reject('error')
	}
}, error => {
	var msg = error.response.data

	return Promise.reject(msg)
})

export default service
