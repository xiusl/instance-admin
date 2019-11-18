import request from '@/utils/request'

const PoemApi = {
  getPoems(page, count, author='') {
    return request({
      url: '/p/poems',
      method: 'get',
      params: {page:page, count:count, author:author}
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
