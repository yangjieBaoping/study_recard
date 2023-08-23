<template>
  <div></div>
</template>

<script setup>
const arr = [1, 5, 6, 4, 3, 9, 2, 7, 8]

// sort方法
// arr.sort((a, b) => {
//   return a - b
// })
// console.log(arr)

// 选择排序
/**
 * 将未排序数据的第一个数据作为基准
 * 在已排序数据和基准数据以外的数据找到最小值
 * 将该数据与基准值调换
 */
// for (let i = 0; i < arr.length; i++) {
//   let minIndex = i
//   for (let j = i + 1; j < arr.length; j++) {
//     if (arr[j] < arr[minIndex]) {
//       minIndex = j
//     }
//   }
//   ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
// }
// console.log(arr)

// 快速排序
/**
 * 取数组中间值为基准值
 * 小于的放在基准值左边大于的放右边
 */

// const getArray = arr => {
//   if (arr.length <= 1) return arr
//   // 获取基准值下标
//   let standardNum = Math.floor(arr.length / 2)
//   let leftArr = []
//   let rightArr = []
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < arr[standardNum]) {
//       leftArr.push(arr[i])
//     } else if (arr[i] > arr[standardNum]) {
//       rightArr.push(arr[i])
//     }
//   }
//   return getArray(leftArr).concat(arr[standardNum], getArray(rightArr))
// }
// console.log(getArray(arr))

// const newArr = [2, 4, 6, 8, 10]
// const oldArr = [1, 3, 5, 7, 9]
// // 排序两个已经排序好的数组
// const setArr = (arr, oldArr) => {
//   if (!arr || !oldArr) return
//   let aEle = arr[0],
//     bEle = oldArr[0],
//     i = 1,
//     j = 1,
//     res = []
//   while (aEle || bEle) {
//     if ((aEle && !bEle) || aEle <= bEle) {
//       res.push(aEle)
//       aEle = arr[i++]
//     } else {
//       res.push(bEle)
//       bEle = oldArr[j++]
//     }
//   }
//   return res
// }
// console.log(setArr(newArr, oldArr))

// 冒泡排序
/**
 * 数组中元素前后两两进行比较
 * 如果后面一个小于前面一个，则进行交换
 */
// for (let g = 0; g < arr.length - 1; g++) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] > arr[i + 1]) {
//       ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
//     }
//   }
// }
// console.log(arr)

// 插入排序
/**
 * 以第一个元素为基准作为一个数组
 * 剩下的数据依次插入到对应位置
 */
// const getArr = arr => {
//   // 进行数据对比的基准数据下标
//   let primeIndex = 0
//   // 进行数据对比的剩余数量值
//   let primeNum = 0
//   for (let i = 1; i < arr.length; i++) {
//     primeIndex = i - 1
//     primeNum = arr[i]
//     while (primeIndex >= 0 && arr[primeIndex] > primeNum) {
//       arr[primeIndex + 1] = arr[primeIndex]
//       primeIndex--
//     }
//     arr[primeIndex + 1] = primeNum
//   }
//   return arr
// }
// console.log(getArr(arr))

// 基尔排序
/**
 * 基于插入排序进行优化
 *数组长度的一半进行分组，使用插入排序
 *完成后再按数组长度的1/4进行分组，使用插入排序
 *直到长度为1
 */
// const xierArr = arr => {
//   // 第一层确定间隔数
//   for (let grap = parseInt(arr.length / 2); grap > 0; grap = parseInt(grap / 2)) {
//     //第二层循环，使用插入排序
//     for (let i = grap; i < arr.length; i++) {
//       let preIndex = i - grap
//       let current = arr[i]
//       while (preIndex >= 0 && current < arr[preIndex]) {
//         arr[preIndex + grap] = arr[preIndex]
//         preIndex -= grap
//       }
//       arr[preIndex + grap] = current
//     }
//   }
//   return arr
// }
// console.log(xierArr(arr))
</script>

<style scoped lang="scss"></style>
