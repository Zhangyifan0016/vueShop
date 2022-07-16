// 导入axios
import axios from 'axios'

// 引入store
import store from '../store'

// 引入通知
import { ElNotification } from 'element-plus'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 全局响应处理
    if (response.status === 200) {
      return response.data
    }
    console.log(response)
  },
  (error) => {
    _showErrorMessage(error.response.data.msg)

    return Promise.reject(error)
  }
)
// 错误信息处理
const _showErrorMessage = (msg) => {
  const message = msg || '未知错误'
  ElNotification({
    message: message,
    type: 'error'
  })
}

// 封装 处理get请求方式的参数问题
const request = (options) => {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return service(options)
}

// 导出axios实例对象
export default request
