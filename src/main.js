import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入公共样式
import './styles/reset.scss'
// 引入svg图标
import installIcons from './svg-icons/index.js'
// 引入页面鉴权
import './permission'
const app = createApp(App)
installIcons(app)

app.use(store).use(router).use(ElementPlus).mount('#app')
