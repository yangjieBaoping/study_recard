<template>
  <div>
    <input
      style="outline: none; border: 1px solid #f3f3f3"
      type="text"
      @input="getValue"
      placeholder="请输入"
    />
  </div>
  <div style="margin-top: 10px">{{ isPrine.value }}</div>
</template>

<script setup>
import { reactive } from 'vue'

const isPrine = reactive({
  value: false,
})

const setNum = value => {
  if (value === 2 || value === 3) {
    return true
  }
  if (value % 2 === 0) {
    return false
  }
  let newNum = 3
  let linNum = Math.sqrt(value)
  while (linNum >= newNum) {
    if (value % newNum === 0) {
      return false
    } else {
      newNum += 2
    }
  }
  return true
}

const getValue = e => {
  if (e.target.value === '') return
  isPrine.value = setNum(Number(e.target.value))
}
</script>

<style scoped lang="scss"></style>
