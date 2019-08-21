import request from '@/utils/request'

export function spiderWeiboByUrl(url) {
  const data = {
    url
  }
  return request({
    url: '/articles/spider',
    method: 'post',
    data
  })
}

export function getWeiboByUrl(url) {
  return request({
    url: '/articles/spider',
    method: 'get',
    params: {url:url}
  })
}

export function getArticles(page, count) {
  return request({
    url: '/articles',
    method: 'get',
    params: {page:page,count:count}
  })
}
