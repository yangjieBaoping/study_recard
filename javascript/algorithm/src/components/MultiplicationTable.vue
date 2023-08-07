<template>
  <div id="multiplication">
    <div
      v-for="item in multiplicationBox"
      :style="{ border: item === '' ? '1px solid transparent' : '1px solid #000' }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const multiplicationBox = reactive([])

const getNum = (ltNum, rtNum) => {
  for (let i = 0; i < ltNum; i++) {
    for (let k = 0; k < rtNum; k++) {
      if (i + 1 >= k + 1) {
        multiplicationBox.push(`${k + 1}*${i + 1}= ${(k + 1) * (i + 1)}`)
      } else {
        multiplicationBox.push('')
      }
    }
  }
}
getNum(9, 9)
</script>

<style scoped lang="scss">
#multiplication {
  display: flex;
  flex-wrap: wrap;
  width: 900px;
}
#multiplication > div {
  width: 98px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
</style>
