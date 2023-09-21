<template>
  <div>
    <select @change="getValue">
      <option v-for="item in canvasList" :value="item.id" :label="item.name"></option>
    </select>
    <div style="margin-top: 10px">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const canvasList = reactive([
  { name: '直线', id: '1' },
  { name: '矩形', id: '2' },
  { name: '圆形', id: '3' },
  { name: '弧形', id: '4' },
  { name: '星行', id: '5' },
  { name: '人物', id: '6' },
])

const getValue = e => {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  if (e.target.value === '1') {
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 50)
    ctx.stroke()
  } else if (e.target.value === '2') {
    ctx.rect(0, 0, 100, 50)
    ctx.stroke()
  } else if (e.target.value === '3') {
    ctx.beginPath()
    ctx.arc(40, 40, 20, 0, 2 * Math.PI)
    ctx.stroke()
  } else if (e.target.value === '4') {
    // 半圆
    ctx.beginPath()
    ctx.arc(40, 40, 20, 0, 1 * Math.PI)
    ctx.stroke()
  } else if (e.target.value === '5') {
  } else if (e.target.value === '6') {
  }
}

// canvas绘制
const getCanvas = () => {}
</script>

<style scoped lang="scss">
select {
  outline: none;
}
</style>
