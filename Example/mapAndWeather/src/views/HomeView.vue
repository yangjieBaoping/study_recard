<template>
  <!-- 地区 -->
  <div id="container"></div>
  <div>当前地区</div>
  <div>{{ currentArea.value }}</div>
  <!-- 天气 -->
  <div>近几日天气</div>
</template>

<script setup>
import { reactive } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

const currentArea = reactive({
  value: '',
})
// AMapLoader.load({
//   key: 'a04f0e0ac72267d014ef75f4f3a6ab39', // 申请好的Web端开发者Key，首次调用 load 时必填
//   version: '2.0', // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
//   plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
// })
//   .then(AMap => {
//     map = new AMap.Map('container')
//   })
//   .catch(e => {
//     console.log(e)
//   })
</script>

<style scoped lang="scss">
#container {
  width: calc(100vw);
  height: 300px;
}
</style>
