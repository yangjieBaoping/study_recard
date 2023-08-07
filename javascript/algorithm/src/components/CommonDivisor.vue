<template>
  <div style="display: flex; align-items: center">
    <input
      type="text"
      style="outline: none; border: 1px solid #f3f3f3; height: 35px"
      ref="numverOne"
      placeholder="请输入数字1"
    />
    <input
      type="text"
      style="outline: none; border: 1px solid #f3f3f3; height: 35px; margin-left: 15px"
      ref="numverTwo"
      placeholder="请输入数字2"
    />
    <div
      style="
        padding: 0px 10px;
        height: 35px;
        border: 1px solid #f3f3f3;
        margin-left: 15px;
        line-height: 35px;
        cursor: pointer;
      "
      @click="getValue"
    >
      计算
    </div>
  </div>
  <div>结果</div>
  <div style="margin-top: 15px">{{ CommonDivisor.value }}</div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const CommonDivisor = reactive({
  value: undefined,
})

const numverOne = ref('')
const numverTwo = ref('')

const getValue = () => {
  let a = numverOne.value.value
  let b = numverTwo.value.value
  if (a !== '' && b !== '') {
    getCommonDivisor(Number(a), Number(b))
  }
}

// 最大公约数
const getCommonDivisor = (a, b) => {
  if (b === 0) {
    CommonDivisor.value = a
  } else getCommonDivisor(b, a % b)
  // let divisor = 2,
  //   res = 1
  // if (a < 2 || b < 2) {
  //   return 1
  // }
  // while (a >= divisor && b >= divisor) {
  //   if (a % divisor === 0 && b % divisor === 0) {
  //     res = divisor
  //   }
  //   divisor++
  // }
  // CommonDivisor.value = res
}
</script>

<style scoped lang="scss"></style>
