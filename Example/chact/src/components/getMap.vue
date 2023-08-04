<template>
  <div id="body">
    <div id="container"></div>
    <button @click="$emit('addCont')">返回</button>
  </div>
</template>
<script setup>
import AMapLoader from '@amap/amap-jsapi-loader'

const getMap = () => {
  AMapLoader.load({
    key: "a04f0e0ac72267d014ef75f4f3a6ab39", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "1.4.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  }).then(AMap => {
    new AMap.Map('container', {
      viewMode: '2D',  // 默认使用 2D 模式
      zoom:11,  //初始化地图层级
      center: [116.397428, 39.90923]  //初始化地图中心点
    })
  })
}
getMap()
</script>

<style scoped>
#body{
  position: relative;
  width: 100vw;
  height: 100vh;
}
#container{
  width: 100vw;
  height: 100vh;
}
button{
  width: auto;
  position: absolute;
  top: 10px;
  left: 10px;
  outline: none;
}
</style>