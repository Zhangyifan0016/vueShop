import request from '../utils/request'

const getStatistics1 = () => {
  return request({ url: '/admin/statistics1', method: 'GET' })
}

const getStatistics3 = (type) => {
  return request({ url: '/admin/statistics3?type=' + type, method: 'GET' })
}

const getStatistics2 = () => {
  return request({ url: '/admin/statistics2', method: 'GET' })
}

export default {
  getStatistics1,
  getStatistics3,
  getStatistics2
}
