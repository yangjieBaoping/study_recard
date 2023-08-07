<template>
  <div>
    <select class="select_style" @change="getValue">
      <option v-for="item in selectData" :value="item.id" :label="item.value"></option>
    </select>
    <div style="margin-top: 10px">
      <MultiplicationTable v-if="selectValue.value === 1" />
      <PrimeNumver v-if="selectValue.value === 2" />
      <Fibonacci v-if="selectValue.value === 3" />
      <CommonDivisor v-if="selectValue.value === 4" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import MultiplicationTable from '@/components/MultiplicationTable.vue'
import PrimeNumver from '@/components/PrimeNumver.vue'
import Fibonacci from '@/components/Fibonacci.vue'
import CommonDivisor from '@/components/CommonDivisor.vue'
const selectData = reactive([
  { value: '九九乘法表', id: 1 },
  { value: '判断是否为素数', id: 2 },
  { value: '斐波那契', id: 3 },
  { value: '最大公约数', id: 4 },
])

const selectValue = reactive({
  value: 1,
})

const getValue = e => {
  selectValue.value = Number(e.target.value)
}
</script>

<style scoped lang="scss">
.select_style {
  outline: none;
  border: 1px solid #f3f3f3;
}
</style>
