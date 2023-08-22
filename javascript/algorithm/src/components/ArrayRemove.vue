<template>
  <div></div>
</template>

<script setup>
// 去重
const getRemove = arr => {
  if (arr === null || arr.length <= 2) {
    return arr
  }
  let res = [],
    exits = []
  for (let i = 0; i < arr.length; i++) {
    let j = arr[i]
    while (!exits[j]) {
      res.push(arr[i])
      exits[j] = true
    }
  }
  return res

  // es6 newSet方法
  // return [...new Set(arr)]

  // 利用filter去重
  // let data = arr.filter((item, index) => {
  //   return arr.indexOf(item) === index
  // })
  // return data
}
console.log(getRemove([1, 3, 4, 3, 5, 4, 7]))

// 删除重复的字符
const getStrRemove = str => {
  if (str.length <= 2 || typeof str !== 'string') return
  let res = [],
    exits = []
  for (let i in str) {
    let j = str[i]
    while (!exits[j]) {
      res.push(str[i])
      exits[j] = true
    }
  }
  return res.join('')
}
console.log(getStrRemove('sdaiu8wsdawsdwa'))
</script>

<style scoped lang="scss"></style>
