<template>
  <div
    v-if="props.select_id === 1"
    class="input_box"
    :style="{ width: props.selectWidth ? props.selectWidth : '200px' }"
    @click="changeTime"
  >
    <input
      type="text"
      style="width: calc(100% - 40px)"
      v-model="showTime.value"
      placeholder="当前时间"
    />
    <div class="img_box"></div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  select_id: Number,
  selectWidth: String,
  selectHeight: String,
});

const showTime = reactive({
  value: "",
});

// 时间数组
const timesList = reactive({
  // 年份
  years: [],
  // 月份
  months: [],
  // 当月天数
  days: [],
  // 小时
  hours: [],
  // 分钟
  minutes: [],
  // 秒
  seconds: [],
});

// 获取初始化时间
const initializationTime = () => {
  switch (props.select_id) {
    case 1:
      let H =
        new Date().getHours() > 10
          ? new Date().getHours()
          : `0${new Date().getHours()}`;
      let M =
        new Date().getMinutes() > 10
          ? new Date().getMinutes()
          : `0${new Date().getMinutes()}`;
      showTime.value = `${H}:${M}`;
  }
};
initializationTime();

const changeTime = () => {};
</script>

<style scoped lang="scss">
.input_box {
  display: flex;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  .img_box {
    width: 30px;
    height: 30px;
  }
}
input {
  outline: none;
  border: none;
  height: 30px;
  cursor: pointer;
  padding-left: 10px;
}
</style>
