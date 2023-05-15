<template>
  <button style="outline: none;border: 1px solid #f3f3f3;" @click="btnFun">
    {{ clickNum.number % 2 === 0 ? '开始' : '暂停' }}
  </button>
  <div id="main">
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

const clickNum = reactive({
  // 开关按钮点击次数
  number: 0,
  // 键盘按下次数
  downNum: 0,
  // 保留当前移动方向
  direction: ''
})
/**
 * @param auto // 原子大小 20*20
 * @param xauto // x横向原子数——盒子长20*40
 * @param yauto // y纵向原子数——盒子高20*20
*/
onMounted(() => {
  let main = document.getElementById('main')
  // 创建地图
  function Map (auto, xauto, yauto) {
    this.auto = auto
    this.xauto = xauto
    this.yauto = yauto
    this.create = function () {
      let canvas = document.createElement('div')
      canvas.style.cssText='position: relative;border: 1px solid #f3f3f3'
      canvas.style.width = this.auto * this.xauto + 'px'
      canvas.style.height = this.auto * this.yauto + 'px'
      main.appendChild(canvas)
      return canvas
    }
  }
  var map = new Map(20, 40, 20).create()

  // 创建食物
  function Food (map, auto, xauto, yauto) {
    let food = document.createElement('div')
    food.style.cssText='position: absolute;'
    food.style.width  = auto + 'px'
    food.style.height  = auto + 'px'
    food.style.backgroundColor = 
    `rgb(${Math.floor(Math.random() * 255)}
     ,${Math.floor(Math.random() * 255)}
     ,${Math.floor(Math.random() * 255)})`
    food.style.left = Math.floor(Math.random()*xauto) * auto + 'px'
    food.style.top = Math.floor(Math.random()*yauto) * auto + 'px'
    map.appendChild(food)
    return food
  }
  var food = new Food(map, 20, 40, 20)

  // 创建蛇
  /**
   * 蛇分为头、身、尾三部分
   * 其中data为身体个数
   * left为x向坐标
   * top为y向坐标
  */
 function getSnake (map, auto, data, left, top) {
   let snake = document.createElement('div')
   // 头部
   let snakeHead = document.createElement('div')
   snakeHead.style.width = auto + 'px'
   snakeHead.style.height = auto + 'px'
   snakeHead.style.backgroundColor = 
   `rgb(${Math.floor(Math.random() * 255)}
   ,${Math.floor(Math.random() * 255)}
   ,${Math.floor(Math.random() * 255)})`
   snakeHead.style.position = 'absolute'
   snakeHead.style.left = left ? left + auto + 'px' : 0 * auto + 'px'
   snakeHead.style.top = top ? top + 'px' : 0 * auto + 'px'
   // 身体
   for (let i = 0; i < data; i++) {
     let snakeBody = document.createElement('div')
     snakeBody.style.width = auto + 'px'
     snakeBody.style.height = auto + 'px'
     snakeBody.style.backgroundColor =
     `rgb(${Math.floor(Math.random() * 255)}
     ,${Math.floor(Math.random() * 255)}
     ,${Math.floor(Math.random() * 255)})`
     snakeBody.style.position = 'absolute'
     snakeBody.style.left = left ? left + auto + 'px' : 0 * auto + 'px'
     snakeBody.style.top = top ? top + 'px' : 1 * auto + 'px'
     snake.appendChild(snakeBody)
   }
   // 尾部
   let snakeTail = document.createElement('div')
   snakeTail.style.width = auto + 'px'
   snakeTail.style.height = auto + 'px'
   snakeTail.style.backgroundColor = 
   `rgb(${Math.floor(Math.random() * 255)}
   ,${Math.floor(Math.random() * 255)}
   ,${Math.floor(Math.random() * 255)})`
   snakeTail.style.position = 'absolute'
   snakeTail.style.left = left ? left + auto + 'px' : 0 * auto + 'px'
   snakeTail.style.top = top ? top + 'px' : 2 * auto + 'px'
   snake.appendChild(snakeHead)
   snake.appendChild(snakeTail)
    snake.style.zIndex = 2
   map.appendChild(snake)
   return snake
 }
  var snake = new getSnake(map, 20, 1)

  function snakeEitFood (snake,food) {
    for (let i = 0; i < snake.children.length; i++) {
      if (i === snake.children.length - 1) {
        if (clickNum.direction === 'top') {
          snake.children[i].style.top = Number.parseInt(snake.children[i - 1].style.top) - 20 + 'px'
        } else if (clickNum.direction === 'down') {
          snake.children[i].style.top = Number.parseInt(snake.children[i - 1].style.top) + 20 + 'px'
        } else if (clickNum.direction === 'left') {
          snake.children[i].style.left = Number.parseInt(snake.children[i - 1].style.left) - 20 + 'px'
        } else {
          snake.children[i].style.left = Number.parseInt(snake.children[i - 1].style.left) + 20 + 'px'
        }
        snake.children[i].style.backgroundColor = food.style.backgroundColor
      }
    }
  }

  // 运动初始速度为20——即向上、下、左、右四个方向移动20px
  /**
   * @param direction // 运动方向
   * @param grade // 等级
  */
  const getRun = function(snake, direction, auto,grade) {
    // 以蛇的头部为基准
    let snake_top = snake.children[snake.children.length - 1].style.top
    let snake_left = snake.children[snake.children.length - 1].style.left
    // 头部
    // 判断是否到达基准位置
    for (let i = 0; i < snake.children.length; i++) {
      // 移动
      if (direction === 'right') {
        if (Number.parseInt(snake_top) === Number.parseInt(snake.children[i].style.top)) {
          snake.children[i].style.left = auto * grade + Number.parseInt(snake.children[i].style.left) + 'px'
        } else {
          snake.children[i].style.top = Number.parseInt(snake.children[i + 1].style.top) + 'px'
          snake.children[i].style.left = Number.parseInt(snake.children[i + 1].style.left) + 'px'
        }
      } else if (direction === 'left') {
        if (Number.parseInt(snake_top) === Number.parseInt(snake.children[i].style.top)) {
          snake.children[i].style.left = Number.parseInt(snake.children[i].style.left) - auto * grade + 'px'
        } else {
          snake.children[i].style.top = Number.parseInt(snake.children[i + 1].style.top) + 'px'
          snake.children[i].style.left = Number.parseInt(snake.children[i + 1].style.left) + 'px'
        }
      } else if (direction === 'down') {
        if (Number.parseInt(snake_left) === Number.parseInt(snake.children[i].style.left)) {
          snake.children[i].style.top = auto * grade + Number.parseInt(snake.children[i].style.top) + 'px'
        } else {
          snake.children[i].style.top = Number.parseInt(snake.children[i + 1].style.top) + 'px'
          snake.children[i].style.left = Number.parseInt(snake.children[i + 1].style.left) + 'px'
        }
      } else if (direction === 'top') {
        if (Number.parseInt(snake_left) === Number.parseInt(snake.children[i].style.left)) {
          snake.children[i].style.top = Number.parseInt(snake.children[i].style.top) - auto * grade + 'px'
        } else {
          snake.children[i].style.top = Number.parseInt(snake.children[i + 1].style.top) + 'px'
          snake.children[i].style.left = Number.parseInt(snake.children[i + 1].style.left) + 'px'
        }
      }
      if (Number.parseInt(snake.children[0].style.top) < 0 ||
      snake.children[snake.children.length - 1].style.top < 0) {
        getSnake(map, 20, 1)
        Food(map, 20, 40, 20)
        return
      }
      console.log();
    }
    // 吃到
    if (food.style.left === snake.children[0].style.left 
    && food.style.top === snake.children[0].style.top ||
    food.style.left === snake.children[snake.children.length - 1].style.left
    && food.style.top === snake.children[snake.children.length - 1].style.top) {
      snake.appendChild(food)
      snakeEitFood(snake,food)
      food = new Food(map, 20, 40, 20)
    }
  }
 

  window.onkeydown = function (event) {
    if (clickNum.number === 0) {
      alert('请先点击开始')
      return;
    }
    clickNum.downNum += 1
    // 右
    if (event.keyCode === 68) {
      clickNum.direction = 'right'
      if (clickNum.direction === 'left') return
      getRun(snake, 'right', 20, 1, clickNum.downNum)
    // 下
    } else if (event.keyCode === 83) {
      clickNum.direction = 'down'
      if (clickNum.direction === 'top') return
      getRun(snake, 'down', 20, 1, clickNum.downNum)
    // 左
    } else if (event.keyCode === 65) {
      clickNum.direction = 'left'
      if (clickNum.direction === 'right') return
      getRun(snake, 'left', 20, 1, clickNum.downNum)
    // 上
    } else if (event.keyCode === 87) {
      clickNum.direction = 'top'
      if (clickNum.direction === 'down') return
      getRun(snake, 'top', 20, 1, clickNum.downNum)
    }
  }
})
// 结束和暂停
// const gameOver = function (map, value) {
//   let over = document.createElement('div')
//   over.innerText = value
//   over.style.width = map.style.width
//   over.style.height = map.style.height
//   over.style.position = 'absolute'
//   over.style.left = 0 +'px'
//   over.style.top = 0 +'px'
//   over.style.zIndex = 3
// }
const btnFun = () => {
  clickNum.number += 1
  if (clickNum.number % 2 !== 0) {
    // gameOver('暂停')
  }
}
</script>

<style scoped>
#main{
  margin: 10px;
}
</style>
