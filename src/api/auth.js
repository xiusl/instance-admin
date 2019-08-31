import request from '@/utils/request'

export function loginByUsername(phone, password) {
  const data = {
    phone,
    password
  }
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

export function loginByPhonePwd(phone, password) {
  const data = {phone, password}
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

export function getUploadToken(type) {
  return request({
    url: '/settings',
    method: 'get',
    params: {'mime_type':type}
  })
}
