import { createApp } from 'vue'
import App from './App.vue'

// 引入公共样式
import '../src/assets/allstyle.css'

window._AMapSecurityConfig = {
  securityJsCode:"b7c54ae310da8d79021001ff2a1eab67",
}

createApp(App).mount('#app')
