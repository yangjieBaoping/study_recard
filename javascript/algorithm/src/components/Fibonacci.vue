<template>
  <div>
    <input
      style="outline: none; border: 1px solid #f3f3f3; height: 35px"
      type="text"
      placeholder="请输入"
      @input="getValue"
    />
  </div>
  <div style="margin-top: 15px; font-size: 20px">{{ result.value }}</div>
</template>

<script setup>
import { reactive } from 'vue'

const result = reactive({
  value: undefined,
})

const getValue = e => {
  if (e.target.value === '') return
  result.value = fibonacci(Number(e.target.value))
}
/**
 * 斐波那契
 * f(0) = 0
 * f(1) = 1
 * f(n) = f(n - 1) + f(n - 2) n >= 2
 */
function fibonacci(value) {
  // 递归
  if (value === 0 || value === 1) return value
  return fibonacci(value - 1) + fibonacci(value - 2)
  //   /**
  //    * 先根据0和1计算出2
  //    * 再根据1和2计算出3
  //    */
  //   let ori = [0, 1]
  //   if (value < 2) {
  //     return ori[value]
  //   }
  //   let fiboOne = 1,
  //     fiboTwo = 0,
  //     fiboSum = 0
  //   for (let i = 2; i <= value; i++) {
  //     fiboSum = fiboOne + fiboTwo
  //     fiboTwo = fiboOne
  //     fiboOne = fiboSum
  //   }
  //   return fiboSum
}
</script>

<style scoped lang="scss"></style>
