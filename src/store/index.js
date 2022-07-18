import { createStore } from 'vuex'
import login from './modules/login'
import menus from './modules/menus'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    login,
    menus
  }
})
