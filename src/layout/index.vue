<template>
  <div>
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <AppAside></AppAside>
        </el-aside>
        <el-main>
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

import {} from 'vue'
</script>
<style scoped lang="scss">
.el-container {
  height: 100vh;
  background-color: #f3f3f3;
}
.el-header {
  background-color: #4338ca;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #ffff;
  color: #333;
}

.el-main {
  color: #333;
}
</style>
