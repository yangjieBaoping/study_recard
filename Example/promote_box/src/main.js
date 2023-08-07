import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.scss'

// 高德地图API
window._AMapSecurityConfig = {
  securityJsCode: 'b7c54ae310da8d79021001ff2a1eab67',
}

createApp(App).use(store).use(router).mount('#app')
