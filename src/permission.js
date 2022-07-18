// 引入router
import router from './router'
// 引入vuex
import store from './store'
import { filterRoutes } from './utils/router'

// 设置白名单
const whiteList = ['/login']

// 挂载路由守卫
router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (!store.getters.userInfo) {
        // 调取用户信息接口
        const res = await store.dispatch('login/getUserInfo')
        if (res) {
          const menus = res.data.menus
          const routes = filterRoutes(menus)
          if (routes.length > 0) {
            routes.forEach((item) => {
              router.addRoute('index', item)
            })
            // next({ ...to, replace: true })
            return next(to.path)
          }
          next()
        } else {
          next('/login')
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
