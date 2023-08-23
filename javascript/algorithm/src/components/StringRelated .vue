<template>
  <div>
    <div>字符串原位反转</div>
    <input type="text" ref="reversal_str" @change="getReversalStr" class="input_text" />
    <div>结果</div>
    <input type="text" ref="reversal_str_result" class="input_text" />
    <div>是否为回文</div>
    <input type="text" ref="moslems_str" class="input_text" @change="getMoslems" />
    <div>结果</div>
    <div>{{ moslems.value }}</div>
    <div>连字符转驼峰</div>
    <input type="text" ref="hump_str" class="input_text" @change="getHump" />
    <div>结果</div>
    <input type="text" ref="hump_str_result" class="input_text" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const reversal_str = ref('')
const reversal_str_result = ref('')
const moslems_str = ref('')
const hump_str = ref('')
const hump_str_result = ref('')

const moslems = reactive({ value: false })

// 字符串反转
const getReversalStr = () => {
  let str = reversal_str.value.value
  if (str.length === 0) return
  reversal_str_result.value.value = str.split(' ').reverse().join(' ').split('').reverse().join('')
}

// 判读是否为回文
const getMoslems = () => {
  let str = moslems_str.value.value
  if (!str || str.length < 2) return
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      moslems.value = false
    } else moslems.value = true
  }
}

// 连字符转驼峰
const getHump = () => {
  let str = hump_str.value.value
  if (str.indexOf('-') === -1) return
  let arr = str.split('-')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1)
  }
  hump_str_result.value.value = arr.join('')
}
</script>

<style scoped lang="scss">
.input_text {
  outline: none;
  border: 1px solid #f3f3f3;
  height: 30px;
  width: 200px;
}
</style>
