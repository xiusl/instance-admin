import request from '@/utils/request'

const ArtApi = {
  spiderWeiboByUrl(url,type) {
    const data = {
      url,
      type
    }
    return request({
      url: '/articles/spider',
      method: 'post',
      data
    })
  },

  getWeiboByUrl(url) {
    return request({
      url: '/articles/spider',
      method: 'get',
      params: {url:url}
    })
  },

  getArticles(page, count) {
    return request({
      url: '/articles',
      method: 'get',
      params: {page:page,count:count}
    })
  },

  getArticleById(id) {
    return request({
      url: '/articles/'+id,
      method: 'get'
    })
  },

  deleteArticle(id) {
    return request({
      url: '/articles/'+id,
      method: 'delete',
    })
  },

  createArticleSource(data) {
    return request({
      url: '/sources',
      method: 'post',
      data
    })
  }
}

export default ArtApi
