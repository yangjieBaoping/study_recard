<template>
  <div>
    <input type="text" ref="count_result" />
  </div>
  <div class="count_box">
    <div v-for="item in 10" style="text-align: center; cursor: pointer" @click="getCount">
      {{ item - 1 }}
    </div>
    <div style="cursor: pointer; user-select: none" @click="sizeCount($event)">+</div>
    <div style="cursor: pointer; user-select: none" @click="sizeCount($event)">-</div>
    <div style="cursor: pointer; user-select: none" @click="sizeCount($event)">*</div>
    <div style="cursor: pointer; user-select: none" @click="sizeCount($event)">/</div>
    <div style="cursor: pointer; user-select: none" @click="dengyuCount">=</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 计算盒子
const count_result = ref('')
const numberArr = reactive([])
const countBox = reactive([])

const getCount = e => {
  count_result.value.value += e.target.innerText
  numberArr.push(e.target.innerText)
}

// 计算
const sizeCount = e => {
  let data = count_result.value.value
  if (data.length === 0) return
  if (isNaN(parseInt(data[data.length - 1]))) return
  if (numberArr.length) {
    countBox.push(numberArr.join(''))
  }
  count_result.value.value += e.target.innerText
  countBox.push(e.target.innerText)
  numberArr.splice(0, numberArr.length)
}

const dengyuCount = () => {
  if (countBox.length === 0) return
  countBox.push(numberArr.join(''))
  /**
   * 运算规则
   * 若有乘除先算乘除结果再算加减结果
   * 除不尽时默认2位小数
   */
  function fourOperations() {
    for (let i = 0; i < countBox.length; i++) {
      if (countBox.indexOf('*') > -1) {
        if (countBox[i] === '*') {
          countBox.splice(i - 1, 3, Number(countBox[i - 1]) * Number(countBox[i + 1]))
        }
      } else {
        if (countBox.indexOf('/') > -1) {
          if (countBox[i] === '/') {
            let data = Number(countBox[i - 1]) / Number(countBox[i + 1])
            // 判断data是否为整数
            if (data % 1 !== 0) {
              data = data.toFixed(2)
            }
            countBox.splice(i - 1, 3, data)
          }
        } else {
          if (countBox.indexOf('+') > -1) {
            if (countBox[i] === '+') {
              countBox.splice(i - 1, 3, Number(countBox[i - 1]) + Number(countBox[i + 1]))
            }
          } else {
            if (countBox[i] === '-') {
              countBox.splice(i - 1, 3, Number(countBox[i - 1]) - Number(countBox[i + 1]))
            }
          }
        }
      }
    }
    if (countBox.length > 1) {
      fourOperations()
    } else {
      count_result.value.value = countBox[0]
      // 清空多余数据
      numberArr.splice(0, numberArr.length)
    }
  }
  fourOperations()
}
</script>

<style scoped lang="scss">
input {
  outline: none;
}
.count_box {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-gap: 10px;
  width: 100px;
}
</style>
