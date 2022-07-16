import loginApi from '../../api/login'
import { getItem, setItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
  actions: {
    async login({ commit }, payload) {
      const res = await loginApi.login(payload)
      if (res.msg === 'ok') {
        commit('setToken', res.data.token)
      }
      return res
    }
  }
}
