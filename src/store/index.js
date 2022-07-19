import { createStore } from 'vuex'
import login from './modules/login'
import menus from './modules/menus'
import tagsview from './modules/tagsview'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    login,
    menus,
    tagsview
  }
})
