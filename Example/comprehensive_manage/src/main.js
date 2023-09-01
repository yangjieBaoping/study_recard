import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入公共样式
import './assets/style/index.scss'

// 引入全局组件
import Button from '@/components/Button.vue'

createApp(App).use(store).use(router).component('Button', Button).mount('#app')
