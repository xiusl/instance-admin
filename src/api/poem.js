import request from '@/utils/request'

const PoemApi = {
  getPoems(page, count) {
    return request({
      url: '/p/poems',
      method: 'get',
      params: {page:page, count:count}
    })
  },
  getAuthors(page, count) {
    return request({
      url: '/p/authors',
      method: 'get',
      params: {page:page, count:count}
    })
  }
}

export default PoemApi
