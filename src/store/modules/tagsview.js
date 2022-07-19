import { getItem, setItem } from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    tagsView: getItem('tagsView') || []
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
    removeTags(state, tagsView) {
      setItem('tagsView', tagsView)
    }
  }
}
