<template>
  <!-- n*n方格 -->
  <div id="main" @click="getClickDom($event)"></div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  let main = document.getElementById('main')

  // 创建n*n方格
  /**
   * @param auto // n的值
  */
  function getCheck (auto) {
    for (let i = 0; i < auto; i++) {
      let box = document.createElement('div')
      box.style.display = 'flex'
      for (let i = 0; i < auto; i++) {
        let canvas = document.createElement('div')
        canvas.style.width = 20 + 'px'
        canvas.style.height = 20 + 'px'
        canvas.style.border = '1px solid #f3f3f3'
        canvas.style.backgroundColor = getColor()
        box.appendChild(canvas)
      }
      main.appendChild(box)
    }
  }
  // 随机红黄蓝绿四色
  function getColor() {
    let color = ''
    let colors = ['red', 'yellow', 'blue', 'green']
    color = colors[Math.floor(Math.random() * colors.length)]
    return color
  }
  let check = new getCheck(4)
  console.log(check);
  function isTheSame (main) {
    // let arr = []
    for (let k = 0; k < main.children.length; k++) {
      for (let i = 0; i < main.children[k].children.length; i++) {
        // 若基准在最左边
        console.log(main.children[k].children[i].style.backgroundColor);
      }
    }
  }
  if (isTheSame(main)) {
    console.log(1);
  }
})
function getClickDom (e) {
  console.log(e.target);
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
