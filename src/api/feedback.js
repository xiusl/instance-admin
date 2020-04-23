import request from '@/utils/request'

const FeedbackApi = {
  getFeedbacks(page, count) {
    return request({
      url: '/feedbacks',
      method: 'get',
      params: {page:page, count:count}
    })
  }
}

export default FeedbackApi 
