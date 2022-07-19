const getters = {
  token: (state) => state.login.token,
  userInfo: (state) => state.login.userInfo,
  isCollapse: (state) => state.menus.isCollapse,
  tagsView: (state) => state.tagsview.tagsView
}

export default getters
