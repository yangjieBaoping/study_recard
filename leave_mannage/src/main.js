import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// 引入公共样式
import "@/assets/allstyle.scss";

createApp(App).use(router).use(store).mount("#app");
