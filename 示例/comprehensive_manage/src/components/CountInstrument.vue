<template>
  <div>
    <input type="text" id="count_result" />
  </div>
  <div class="count_box">
    <div v-for="item in 9" @click="getCount">{{ item }}</div>
    <div @click="jiaCount">+</div>
    <div @click="jianCount">-</div>
    <div @click="shenCount">*</div>
    <div @click="chuCount">/</div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const countList = reactive([]);

const getCount = (e) => {
  let countResult = document.getElementById("count_result");
  let data = e.target.value;
  if (data) {
    countResult.innerText = data;
  }
};

// 计算
const jiaCount = () => {};
const jianCount = () => {};
const shenCount = () => {};
const chuCount = () => {};
</script>

<style scoped lang="scss">
input {
  outline: none;
}
.count_box {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-gap: 10px;
}
</style>
