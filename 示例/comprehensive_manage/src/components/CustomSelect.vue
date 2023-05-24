<template>
  <div v-if="props.select_id === 1" class="input_box" :style="{ width: props.selectWidth ? props.selectWidth : '200px' }"
    >
    <input type="text" @focus="changeTime(1)" style="width: calc(100% - 40px)" v-model="showTime.value" placeholder="当前时间" />
    <div class="img_box"></div>
  </div>
  <div id="hours_minute_box" v-if="timesStatus.hours_minute" :style="{
    width: props.selectWidth ? props.selectWidth : '200px'
  }">
    <div class="hours_minute_box_item">
      <div style="line-height: 30px;border-bottom: 1px solid #f3f3f3;" v-for="item in timesList.hours" :key="item">{{ item
      }}</div>
    </div>
    <div class="hours_minute_box_item">
      <div style="line-height: 30px;border-bottom: 1px solid #f3f3f3;" v-for="item in timesList.minutes" :key="item">{{ item
      }}</div>
    </div>
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

// 时间弹窗状态
const timesStatus = reactive({
  // 时分弹窗
  hours_minute: false
})

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
      break
  }

  // 初始数据
  // 小时
  for (let i = 0; i < 24; i++) {
    timesList.hours.push(i + 1)
  }
  // 分
  for (let i = 0; i < 60; i++) {
    timesList.minutes.push(i + 1)
  }
};
initializationTime();

const changeTime = (value) => {
  switch (value) {
    case 1:
      console.log(1);
      // timesStatus.hours_minute = true
      break
  }

};
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

// 时间弹窗样式
#hours_minute_box {
  height: 220px;
  border: 1px solid #f3f3f3;
  margin-top: 10px;
  display: flex;
}

.hours_minute_box_item {
  flex: 1;
  overflow-y: scroll;
  text-align: center;
  padding: 10px;
}

// 统一清除滚动条
.hours_minute_box_item::-webkit-scrollbar{
  display: none;
}

</style>
