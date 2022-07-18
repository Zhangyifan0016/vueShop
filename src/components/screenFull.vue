<template>
  <div @click="handleFullScreen">
    <el-tooltip
      effect="dark"
      :content="isFullscreen ? '取消全屏' : '全屏'"
      placement="bottom"
    >
      <el-icon>
        <svg-icon :icon="isFullscreen ? 'aim' : 'screenfull'"></svg-icon>
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
const isFullscreen = ref(false)
// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 切换事件
const handleFullScreen = () => {
  screenfull.toggle()
}
// 设置监听器
onMounted(() => {
  screenfull.on('change', change)
})
// 删除监听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
