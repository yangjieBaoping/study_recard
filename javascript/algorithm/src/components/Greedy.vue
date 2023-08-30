<template>
  <div></div>
</template>

<script setup>
//  判断数组中是否有两数之和
let arr = [1, 5, 3, 4, 6, 4, 12]
let num = 39
const sumFind = (arr, num) => {
  if (!arr || arr.length < 2) return
  let differ = {}
  for (let i = 0; i < arr.length; i++) {
    let subStract = num - arr[i]
    if (differ[subStract]) {
      return true
    } else differ[arr[i]] = true
  }
  return false
}
sumFind(arr, num)

// 加油站问题
const greedy = (n, k, arr) => {
  // n:加满可以行驶的公里数; k:加油站数量; arr:每个加油站之间的距离数组
  if (n == 0 || k == 0 || arr.length == 0 || arr[0] > n) {
    return 'No Solution!' // arr[0] > n ：如果第一个加油站距离太远，也无法到达
  }
  let res = 0,
    distance = 0 // res：加油次数；distance：已行驶距离
  for (let i = 0; i <= k; i++) {
    distance += arr[i]
    if (distance > n) {
      // 已行驶距离 > 加满可以行驶的公里数
      if (arr[i] > n) {
        // 如果目前加油站和前一个加油站的距离 > 加满可以行驶的公里数，则无法到达
        return 'No Solution!'
      }
      // 可以在上一个加油站加油，行驶到目前的加油站i：
      distance = arr[i]
      res++ // 加油次数+1
    }
  }
  return res
}
let newArr = [1, 2, 3, 4, 5, 1, 6, 6]
console.log(greedy(7, 7, newArr)) // 4
</script>

<style scoped lang="scss"></style>
