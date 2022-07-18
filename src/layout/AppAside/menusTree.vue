<template>
  <template v-if="item.child && item.child.length > 0">
    <el-sub-menu :index="item.child[0].frontpath">
      <template #title>
        <el-icon>
          <svg-icon :icon="item.icon"></svg-icon>
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <menusTree
        v-for="(childItem, index) in item.child"
        :item="childItem"
        :key="index"
      ></menusTree>
    </el-sub-menu>
  </template>
  <template v-if="item.child && item.child.length <= 0">
    <el-menu-item :index="item.frontpath">
      <el-icon>
        <svg-icon :icon="item.icon"></svg-icon>
      </el-icon>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>
<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const item = computed(() => {
  return props.item
})
</script>
<style scoped lang="scss"></style>
