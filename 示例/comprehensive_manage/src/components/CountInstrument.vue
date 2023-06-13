<template>
  <div>
    <input type="text" id="count_result" />
  </div>
  <div class="count_box">
    <div
      v-for="item in 10"
      style="text-align: center; cursor: pointer"
      @click="getCount"
    >
      {{ item - 1 }}
    </div>
    <div style="cursor: pointer; user-select: none" @click="jiaCount">+</div>
    <div style="cursor: pointer; user-select: none" @click="jianCount">-</div>
    <div style="cursor: pointer; user-select: none" @click="shenCount">*</div>
    <div style="cursor: pointer; user-select: none" @click="chuCount">/</div>
    <div style="cursor: pointer; user-select: none" @click="dengyuCount">=</div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// 计算盒子
const countBox = reactive({
  value: 0,
});

const getCount = (e) => {
  let countResult = document.getElementById("count_result");
  let data = e.target.innerText;
  countResult.value += data;
};

// 计算
const jiaCount = () => {
  let countResult = document.getElementById("count_result");
  countResult.value += "+";
};
const jianCount = () => {
  let countResult = document.getElementById("count_result");
  countResult.value += "-";
};
const shenCount = () => {
  let countResult = document.getElementById("count_result");
  countResult.value += "*";
};
const chuCount = () => {
  let countResult = document.getElementById("count_result");
  countResult.value += "/";
};
const dengyuCount = () => {
  let countResult = document.getElementById("count_result");
  // 最后输入的值
  // *->/->+->-
  for (let i = 0; i < countResult.value.length; i++) {
    let data = countResult.value[i];
    if (data === "+") {
      if (i - 2 !== "+" || i + 2 !== "+") {
      }
    } else if (data === "-") {
      if (i - 2 !== "-" || i + 2 !== "-") {
      }
    } else if (data === "*") {
      if (i - 2 !== "*" || i + 2 !== "*") {
      }
    } else {
      if (i - 2 !== "/" || i + 2 !== "/") {
      }
    }
  }
};
</script>

<style scoped lang="scss">
input {
  outline: none;
}
.count_box {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-gap: 10px;
  width: 100px;
}
</style>
