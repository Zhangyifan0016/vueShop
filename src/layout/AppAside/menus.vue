<template>
  <el-menu default-active="2" class="el-menu-vertical-demo">
    <menusTree></menusTree>
  </el-menu>
</template>
<script setup>
import menusTree from './menusTree'
import {} from 'vue'
</script>
<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>
