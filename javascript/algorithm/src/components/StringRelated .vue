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
    <div>清空字符串两端空格</div>
    <input type="text" ref="space_str" class="input_text" @change="getSpace" />
    <div>将数字转化为RMB形式</div>
    <input type="text" ref="rmb_str" class="input_text" @change="getRMB" />
    <div>结果</div>
    <input type="text" ref="rmb_str_result" class="input_text" />
    <div>删除相邻相同的字符</div>
    <input type="text" ref="adjacent_str" class="input_text" @change="getAdjacent" />
    <div>结果</div>
    <input type="text" ref="adjacent_str_text" class="input_text" />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const reversal_str = ref('')
const reversal_str_result = ref('')
const moslems_str = ref('')
const hump_str = ref('')
const hump_str_result = ref('')
const space_str = ref('')
const rmb_str = ref('')
const rmb_str_result = ref('')
const adjacent_str = ref('')
const adjacent_str_text = ref('')

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

// 清除字符串两端空白
const getSpace = () => {
  let str = space_str.value.value
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 将数字转化为RMB格式
const getRMB = () => {
  let num = rmb_str.value.value
  if (num.length === 0) return
  if (isNaN(Number(num))) return
  let arr = num.split('').reverse()
  if (arr.length % 3 === 0) return
  let res = []
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i])
    if ((i + 1) % 3 === 0) {
      res.push(',')
    }
  }
  rmb_str_result.value.value = res.reverse().join('')
}

// 删除相邻相同的字符
const getAdjacent = () => {
  let res = [],
    newStr,
    str
  str = adjacent_str.value.value
  if (str.length === 0) return
  for (let i = 0; i < str.length; i++) {
    if (str[i].charAt(0) !== newStr) {
      res.push(str[i].charAt(0))
      newStr = str[i].charAt(0)
    }
  }
  adjacent_str_text.value.value = res.join('')
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
