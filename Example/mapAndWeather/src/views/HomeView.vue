<template>
  <!-- <div id="home_bdoy">
    <div id="home_head"></div>
    <div id="home_body"></div>
  </div> -->
  <div id="container"></div>
</template>

<script type="text/javascript">
window._AMapSecurityConfig = {
  securityJsCode: 'b7c54ae310da8d79021001ff2a1eab67',
}
</script>
<!-- <script src="https://webapi.amap.com/loader.js"></script> -->
<!-- <script type="text/javascript">
AMapLoader.load({
  key: 'a04f0e0ac72267d014ef75f4f3a6ab39', // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
})
  .then(AMap => {
    const map = new AMap.Map('container')
  })
  .catch(e => {
    console.error(e) //加载错误提示
  })
</script> -->
<script setup>
// 判断当前环境
const getEnvironment = () => {
  console.log(navigator.userAgent)
}
getEnvironment()
</script>

<style scoped lang="scss">
// #home {
//   height: 50px;
//   background-color: rgb(0, 204, 255);
// }
// #home_body {
//   height: calc(100vh - 50px);
//   overflow-y: scroll;
// }
// #home_body::-webkit-scrollbar {
//   display: none;
// }
</style>
