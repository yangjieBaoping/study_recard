<template>
  <button style="outline: none;border: 1px solid #f3f3f3;" id="btnFun">
    {{ clickNum.number % 2 === 0 ? '开始' : '暂停' }}
  </button>
  <div id="main"></div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
const clickNum = reactive({
  // 开关按钮点击次数
  number: 0,
  // 键盘按下次数
  downNum: 0,
  // 保留当前移动方向
  direction: ''
})
onMounted(() => {
  var timeer = null;
  var main = document.getElementById('main')
  
  /**
   * @param auto // 单位原子大小
   * @param xauto // 横向原子数
   * @param yauto // 纵向原子数
   * */ 
  
  function Map (auto, xauto, yauto) {
    this.auto = auto
    this.xauto = xauto
    this.yauto = yauto
  
    // 创建画布
    this.cavans = null
    this.createMap = function () {
      this.canvas = document.createElement('div')
      this.canvas.style.cssText='position: relative;border: 1px solid #000'
      this.canvas.style.width = this.auto * this.xauto + 'px'
      this.canvas.style.height = this.auto * this.yauto + 'px'
      main.appendChild(this.canvas)
    }
  }

  function Food (map) {
    this.width = map.auto
    this.height = map.auto
    this.bgcolor =
    `rgb(${Math.floor(Math.random() * 255)}
     ,${Math.floor(Math.random() * 255)}
     ,${Math.floor(Math.random() * 255)})`
     this.x = Math.floor(Math.random() * map.xauto)
     this.y = Math.floor(Math.random() * map.yauto)
    this.flag = document.createElement('div')
    this.flag.style.width = this.width + 'px'
    this.flag.style.height = this.height + 'px'
    this.flag.style.backgroundColor = this.bgcolor
    this.flag.style.position='absolute'
    this.flag.style.left = this.x * this.width + 'px'
    this.flag.style.top = this.y * this.height + 'px'
    map.canvas.appendChild(this.flag)
  }
  
  function Snake (map) {
    this.width = map.auto
    this.height = map.auto
    // 默认方向
    this.direction = ''
    this.body = [
      // 头
      {
        x: 2, y: 0
      },
      // 身
      {
        x: 1, y: 0
      },
      // 尾
      {
        x: 0, y: 0
      }
    ]

    // 显示
    this.display = function() {
      for (let i = 0; i < this.body.length; i++) {
        if (this.body[i].x !== null) {
           var s = document.createElement('dib')
          this.body[i].flag = s
          s.style.width = this.width + 'px'
          s.style.height = this.height + 'px'
          s.style.position = 'absolute'
          s.style.top = this.body[i].y * map.auto + 'px'
          s.style.left = this.body[i].x * map.auto + 'px'
          s.style.backgroundColor = 
          `rgb(${Math.floor(Math.random() * 255)}
          ,${Math.floor(Math.random() * 255)}
          ,${Math.floor(Math.random() * 255)})`
          map.canvas.appendChild(s)
        }
      }
    }

    // 运动
    this.snakeRun = function() {
      // 从后往前运行
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].x = this.body[i - 1].x
        this.body[i].y = this.body[i - 1].y
      }
      switch(this.direction) {
        case 'right': this.body[0].x += 1; break
        case 'left': this.body[0].x -= 1; break
        case 'top': this.body[0].y -= 1; break
        case 'down': this.body[0].y += 1; break
      }
      // 清除原来的蛇
      for (let i = 0; i < this.body.length; i++) {
        if (this.body[i].flag !== null) {
          map.canvas.removeChild(this.body[i].flag)
        }
      }
      this.display()
    }
  }

  var map = new Map(20,40,20)
  map.createMap()
  var food = new Food(map)
  console.log(food);
  var snake = new Snake(map)
  snake.display()

// 键盘事件
window.onkeydown = function(e) {
  switch(e.keyCode) {
    case 87: snake.direction = 'top'; break;
    case 68: snake.direction = 'right'; break;
    case 83: snake.direction = 'down'; break;
    case 65: snake.direction = 'left'; break;

  }
  snake.snakeRun()
}

  document.getElementById('btnFun').addEventListener('click', function(e){
    clickNum.number += 1
    clearInterval(timeer)
    if (e.target.outerText === '开始') {
      timeer = setInterval(() => {
      }, 300)
    }
  })
})
console.log(1)
console.log('1');

</script>

<style scoped>
#main{
  margin: 10px;
}
</style>
