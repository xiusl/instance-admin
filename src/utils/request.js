import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_URL,
	timeout: 360000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
	if (config.method == 'get') {
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	} else {
		config.headers['Content-Type'] = 'application/json'
	}
  config.headers['X-Type'] = 'web'

	return config
}, error => {
	Promise.reject(error)
})

service.interceptors.response.use(response => {
	const res = response.data
	if (res['success']) {
		return res['data']
	} else {
		return Promise.reject('error')
	}
}, error => {
	var msg = error.response.data

	return Promise.reject(msg)
})

export default service
