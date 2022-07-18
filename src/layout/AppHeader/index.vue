<template>
  <div class="header">
    <div class="left">
      <div class="left-menu-item">
        <svg-icon className="eleme hover-effect" icon="eleme"></svg-icon>
        <span>商城后台</span>
      </div>
      <el-icon class="hamburger hover-effect">
        <svg-icon icon="hamburger-opened"></svg-icon>
      </el-icon>
      <!-- 刷新 -->
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon class="reloadIcon hover-effect">
          <svg-icon icon="reload"></svg-icon>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="right">
      <!-- 全屏 -->
      <screenFull class="screen hover-effect"></screenFull>
      <el-avatar class="hover-effect" :size="30" :src="userInfo.avatar" />
      <el-dropdown class="hover-effect" @command="handleCommand">
        <span>
          {{ userInfo.username }}
          <el-icon class="el-icon-right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePassword">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import screenFull from '../../components/screenFull'
import { ArrowDown } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const userInfo = computed(() => {
  return store.getters.userInfo
})
</script>
<style scoped lang="scss">
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  .hover-effect {
    cursor: pointer;
  }
  .left {
    display: flex;
    align-items: center;
    .left-menu-item {
      width: 230px;
      text-align: center;
      .eleme {
        display: inline-block;
        vertical-align: middle;
        width: 40px !important;
        height: 40px;
      }
    }
    .hamburger {
      height: 60px;
      padding: 0 15px;
      &:hover {
        background-color: #4f46e5;
      }
    }
    .reloadIcon {
      height: 60px;
      padding: 0 15px;
      &:hover {
        background-color: #4f46e5;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    color: white;
    .el-avatar {
      margin-left: 10px;
      margin-right: 15px;
    }
    .el-dropdown {
      color: white;
      .el-icon-right {
        vertical-align: middle;
      }
    }
    .screen {
      height: 60px;
      line-height: 60px;
      padding: 0 15px;
      &:hover {
        background-color: #4f46e5;
      }
    }
  }
}
</style>
