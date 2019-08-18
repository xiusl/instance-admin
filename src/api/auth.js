import request from '@/utils/request'

export function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/auth',
    method: 'post',
    data
  })
}
