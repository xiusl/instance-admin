import request from '@/utils/request'

const StatusApi = {
  getStatuses(page, count) {
    return request({
      url: '/statuses',
      method: 'get',
      params: {page:page, count:count}
    })
  },
  deleteStatus(id) {
    return request({
      url: '/statuses/'+id,
      method: 'delete'
    })
  }

}

export default StatusApi
