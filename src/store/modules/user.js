import UserApi from '@/api/user'
import { setToken, getToken, rmToken, getName, setName, rmName } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: getName()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      setName(name)
    }
  },
  actions: {
    LoginByPhonePwd({ commit }, userInfo) {
      const phone = userInfo.phone.trim()
      const password = userInfo.password.trim()
      return new Promise((resolve, reject) => {
        UserApi.loginByPhonePwd(phone, password)
          .then(data => {
            commit('SET_TOKEN', data.token)
            commit('SET_NAME', data.name)
            setToken(data.token)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        rmToken()
        rmName()
        resolve()
      })
    }
  }
}

export default user
