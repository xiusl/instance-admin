import request from '@/utils/request'

export function getCurrentUser() {
  return request({
    url: '/authorizations',
    method: 'get'
  })
}

export function editUser(id, data) {
  return request({
    url: '/users/'+id,
    method: 'post',
    data: {
      name:data.name,
      avatar:data.avatar,
      desc:data.desc,
    }
  })
}

export function editUserEmail(id, email, code) {
  return request({
    url: '/users/'+id,
    method: 'post',
    data: {
      email,
      code
    }
  })
}
