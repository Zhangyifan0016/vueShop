<template>
  <el-row class="login-container">
    <el-col :span="16" class="left">
      <div>
        <h1 class="title">欢迎光临</h1>
      </div>
    </el-col>
    <el-col :span="8" class="right">
      <div>
        <h2 class="formTitle">欢迎回来</h2>
        <el-divider>
          <span class="lineTitle">账号密码登录</span>
        </el-divider>
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model.trim="loginForm.username"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              show-password
              v-model.trim="loginForm.password"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loadingStatus"
              class="loginBtn"
              @click="handleLoginSubmit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
// 引入通知
import { ElNotification } from 'element-plus'
const store = useStore()
const router = useRouter()
const loginForm = reactive({
  username: '',
  password: ''
})
// loading加载状态
const loadingStatus = ref(null)
const loginRef = ref(null)
// 表单校验
const loginRules = reactive({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名不能为空'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '密码不能为空'
    }
  ]
})
const handleLoginSubmit = () => {
  loginRef.value.validate((valid) => {
    if (valid) {
      loadingStatus.value = true
      login()
    }
  })
}
const login = async () => {
  try {
    const res = await store.dispatch('login/login', loginForm)
    if (res.msg === 'ok') {
      router.push('/')
      ElNotification({
        message: '登录成功',
        type: 'success',
        offset: 100
      })
    }
  } catch (error) {
    console.log(error)
    // const { msg } = error.response.data
    // ElNotification({
    //   message: msg,
    //   type: 'error'
    // })
  } finally {
    loadingStatus.value = false
  }
}
</script>
<style scoped lang="scss">
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  .left {
    --tw-bg-opacity: 1;
    background-color: rgba(99, 102, 241, var(--tw-bg-opacity));
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-weight: 700;
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1rem;
      --tw-text-opacity: 1;
      color: rgba(253, 253, 253, var(--tw-text-opacity));
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .formTitle {
      font-weight: 700;
      font-size: 1.875rem;
      line-height: 2.25rem;
      --tw-text-opacity: 1;
      color: rgba(31, 41, 55, var(--tw-text-opacity));
      text-align: center;
    }
    .lineTitle {
      color: #ccc;
    }
    .el-form {
      width: 250px;
      .loginBtn {
        width: 100%;
        border-radius: 15px;
        color: #fff;
        --tw-bg-opacity: 1;
        background-color: rgba(99, 102, 241, var(--tw-bg-opacity));
      }
    }
  }
}
</style>
