import request from '@/utils/request'

export function spiderWeiboByUrl(url) {
  const data = {
    url
  }
  return request({
    url: '/articles',
    method: 'post',
    data
  })
}

export function getWeiboByUrl(url) {
  return request({
    url: '/articles',
    method: 'get',
    params: {url:url}
  })
}
