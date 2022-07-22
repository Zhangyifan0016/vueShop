<template>
  <div>
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '250px'">
          <AppAside></AppAside>
        </el-aside>
        <el-main :style="{ marginLeft: isCollapse ? '65px' : '250px' }">
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import AppHeader from './AppHeader'
import AppAside from './AppAside'
import AppMain from './AppMain'

import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>
<style scoped lang="scss">
.el-container {
  background-color: #f3f3f3;
}
.el-header {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #4338ca;
  color: #333;
  line-height: 60px;
  z-index: 99;
}

.el-aside {
  position: fixed;
  left: 0;
  top: 60px;
  height: 100vh;
  background-color: #ffff;
  color: #333;
}

.el-main {
  overflow: hidden;
  margin-top: 100px;
  color: #333;
}
</style>
