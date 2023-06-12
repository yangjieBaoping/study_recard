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
  btnStatus: "",
});

const getCount = (e) => {
  let countResult = document.getElementById("count_result");
  let data = e.target.innerText;
  if (countBox.btnStatus !== "") {
    if (countBox.btnStatus === "+") {
      countResult.value = Number(countResult.value) + Number(data);
    } else if (countBox.btnStatus === "-") {
      countResult.value = Number(countResult.value) - Number(data);
    } else if (countBox.btnStatus === "*") {
      countResult.value = Number(countResult.value) * Number(data);
    } else {
      countResult.value = Number(countResult.value) / Number(data);
    }
  } else {
    countResult.value += data;
  }
};

// 计算
const jiaCount = () => {
  countBox.btnStatus = "+";
};
const jianCount = () => {
  countBox.btnStatus = "-";
};
const shenCount = () => {
  countBox.btnStatus = "*";
};
const chuCount = () => {
  countBox.btnStatus = "/";
};
const dengyuCount = () => {
  let countResult = document.getElementById("count_result");
  // 最后输入的值
  console.log(countResult.value);
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
