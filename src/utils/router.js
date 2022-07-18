export const filterRoutes = (menus) => {
  const newRoutes = []
  menus.forEach((item) => {
    if (item.child && item.child.length > 0) {
      item.child.forEach((childItem) => {
        const routes = menuRoutes(childItem)
        newRoutes.push(routes)
      })
    }
  })
  newRoutes.push({
    path: '/:catchAll(.*)', // 不识别的path自动匹配404
    redirect: '/404'
  })
  return newRoutes
}

const menuRoutes = (item) => {
  const route = {
    path: item.frontpath,
    name: item.desc,
    meta: {
      title: item.name,
      icon: item.icon
    }
  }
  const path = item.frontpath

  route.component = () => import('@/views' + path)
  return route
}
