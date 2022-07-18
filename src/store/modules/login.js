import loginApi from '../../api/login'
import { getItem, setItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    async login({ commit }, payload) {
      const res = await loginApi.login(payload)
      if (res.msg === 'ok') {
        commit('setToken', res.data.token)
      }
      return res
    },
    // 获取登录用户信息
    async getUserInfo({ commit }) {
      const res = await loginApi.getUserInfo()
      if (res.msg === 'ok') {
        commit('setUserInfo', res.data)
      }
      return res
    },
    // 退出登录
    async logout({ commit }) {
      const res = await loginApi.logout()
      commit('setToken', '')
      commit('setUserInfo', '')

      console.log(res)
      return res
    }
  }
}
