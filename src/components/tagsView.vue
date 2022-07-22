<template>
  <div class="tabs">
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-change="changeTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        :closable="item.path != '/'"
        v-for="item in tagsView"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store = useStore()
const activeTab = ref(route.path)
// 监听路由的变化
watch(
  () => router.currentRoute.value,
  () => {
    if (route.meta && route.meta.title && route.path) {
      const obj = {
        title: route.meta.title,
        path: route.path
      }
      store.commit('tagsview/setTagsView', obj)
    }
  },
  { immediate: true, deep: true }
)
const tagsView = computed(() => {
  return store.getters.tagsView
})

// 点击tagsview跳转
const changeTab = (path) => {
  activeTab.value = path
  router.push(path)
}

// 点击路由跳转tagsview并更新
onBeforeRouteUpdate((to, from) => {
  activeTab.value = to.path
})

const removeTab = (path) => {
  const tagsView = store.getters.tagsView
  let activeName = activeTab.value
  if (activeName === path) {
    tagsView.forEach((tab, index) => {
      if (tab.path === path) {
        const nextTab = tagsView[index + 1] || tagsView[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  activeTab.value = activeName
  const findItemIndex = tagsView.findIndex((tab) => tab.path === path)
  tagsView.splice(findItemIndex, 1)
  store.commit('tagsview/removeTags')
}
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  top: 60px;
  left: 265px;
  right: 15px;
  background-color: #f3f3f3;
  z-index: 99;
}
:deep(.el-tabs__header) {
  border: 0 !important;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  background-color: #fff;
  margin: 0 5px;
  border-radius: 5px;
  height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
}
</style>
