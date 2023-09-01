<template>
  <Message v-if="$store.state.messageData.status" />
  <div id="navabar" :style="{ width: `${modleWidth.width}px` }">
    <MenyListView />
  </div>
  <div id="body">
    <div id="body_top">
      <Search />
    </div>
    <div class="common_title">{{ getTitle() }}</div>
    <div style="height: calc(100vh - 170px)">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import MenyListView from './views/MenyListView.vue'
import Search from './components/Search.vue'
import Message from '@/components/Message.vue'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const $route = useRoute()
const $store = useStore()
// 菜单栏宽度
const modleWidth = reactive({
  width: 0,
})

// 判断当前环境
const getSystem = () => {
  if (navigator.userAgent.indexOf('Windows') > -1) {
    modleWidth.width = 200
  } else {
    modleWidth.width = 50
  }
}
getSystem()

// 获取标题
const getTitle = () => {
  if ($route.path === '/') return '首页'
  if ($route.path === '/ToolClassView') return '工具类'
  if ($route.path === '/BigDataClassView') return '大数据类'
  if ($route.path === '/EntertainmentClassView') return '娱乐类'
}
</script>

<style lang="scss">
#app {
  display: flex;
}
#body {
  flex: 1;
  padding: 10px;
}
#body_top {
  height: 100px;
}
</style>
