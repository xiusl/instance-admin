import request from '@/utils/request'

const UserApi = {
  getCurrentUser() {
    return request({
      url: '/authorizations',
      method: 'get'
    })
  },
  editUser(id, data) {
    return request({
      url: '/users/'+id,
      method: 'post',
      data: {
        name:data.name,
        avatar:data.avatar,
        desc:data.desc,
      }
    })
  },
  editUserEmail(id, email, code) {
    return request({
      url: '/users/'+id,
      method: 'post',
      data: {
        email,
        code
      }
    })
  },
  loginByUsername(phone, password) {
    const data = {
      phone,
      password
    }
    return request({
      url: '/authorizations',
      method: 'post',
      data
    })
  },
  loginByPhonePwd(phone, password) {
    const data = {phone, password}
    return request({
      url: '/authorizations',
      method: 'post',
      data
    })
  },
  getUploadToken(type) {
    return request({
      url: '/settings',
      method: 'get',
      params: {'mime_type':type}
    })
  },
  getVerifyCode(key) {
    return request({
      url: '/verifycodes',
      method: 'get',
      params: {key:key}
    })
  }
}
export default UserApi;
