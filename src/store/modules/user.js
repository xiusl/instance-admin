import { loginByPhonePwd } from '@/api/auth'
import { setToken, getToken, rmToken } from '@/utils/auth'

const user = {
  state: {
    token: '',
    name: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    LoginByPhonePwd({ commit }, userInfo) {
      const phone = userInfo.phone.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {
        loginByPhonePwd(phone, password)
          .then(data => {
            commit('SET_TOKEN', data.token)
            setToken(data.token)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
