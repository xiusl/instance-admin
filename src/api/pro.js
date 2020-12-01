import request from '@/utils/request'

const ProApi = {
  getProducts(page=1, count=10) {
    return request({
      url: '/products',
      method: 'get',
      params: {page:page, count:count}
    })
  },
  putProducts(data) {
    return request({
      url: '/products',
      method: 'post',
      body: data
    })
  },
  getProduct(id) {
    return request({
      url: '/products/'+id,
      method: 'get'
    })
  },
  getVersions(product_id) {
    return request({
      url: '/products/'+product_id+'/versions',
      method: 'get'
    })
  },
  getVersion(v_id) {
    return request({
        url: '/versions/'+ v_id,
        method: 'get'
    })
  },
  getToken(data) {
    return request({
        url: '/qing/token',
        method: 'post',
        data: data
    })
  },
  putProductsVersion(id, data) {
    return request({
        url: '/products/' + id + '/versions',
        method: 'post',
        data: data
    })
  }
}

export default ProApi
