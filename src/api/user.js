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
  loginByPhoneCode(phone, code) {
    const data = {phone, code}
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
  },
  editPassword(id, newPwd, oldPwd) {
    return request({
      url: '/users/'+id,
      method: 'post',
      data: {
        'old_password': oldPwd,
        'password': newPwd
      }
    })
  },
  getUsers(page, count) {
    return request({
      url: '/users',
      methods: 'post',
      params: {page:page, count:count}
    })
  }
}
export default UserApi;
