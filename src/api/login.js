import request from '../utils/request'

const login = (data) => {
  return request({ url: '/admin/login', method: 'POST', data })
}

// 获取登录用户信息
const getUserInfo = () => {
  return request({ url: '/admin/getinfo', method: 'POST' })
}

// 退出登录
const logout = () => {
  return request({ url: '/admin/logout', method: 'POST' })
}

export default {
  login,
  getUserInfo,
  logout
}
