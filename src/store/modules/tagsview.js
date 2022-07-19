import { getItem, setItem } from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    tagsView: getItem('tagsView') || [{ title: '主控台', path: '/' }]
  },
  mutations: {
    setTagsView(state, tagsView) {
      const tagsViewStatus = state.tagsView.find(
        (item) => item.path === tagsView.path
      )
      if (!tagsViewStatus) {
        state.tagsView.push(tagsView)
        setItem('tagsView', state.tagsView)
      }
    },
    removeTags(state) {
      setItem('tagsView', state.tagsView)
    }
  }
}
