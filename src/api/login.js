import request from '../utils/request'

const login = (data) => {
  return request({ url: '/admin/login', method: 'POST', data })
}

export default {
  login
}
