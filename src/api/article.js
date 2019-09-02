import request from '@/utils/request'

export function spiderWeiboByUrl(url,type) {
  const data = {
    url,
    type
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

export function getArticleById(id) {
  return request({
    url: '/articles/'+id,
    method: 'get'
  })
}

export function deleteArticle(id) {
  return request({
    url: '/articles/'+id,
    method: 'delete',
  })
}

export function createArticleSource(data) {
  return request({
    url: '/sources',
    method: 'post',
    data
  })
}
