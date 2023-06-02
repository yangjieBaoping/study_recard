<template>
  <div
    :style="{
      width: props.selectWidth ? props.selectWidth : '200px',
      height: props.selectHeight ? props.selectHeight : '35px',
    }"
  >
    <input
      type="text"
      @focus="timesStatus.status = true"
      @blur="timesStatus.status = false"
      placeholder="选择日期"
    />
    <div
      style="margin-top: 10px; padding: 10px; border: 1px solid #666"
      :style="{
        width: props.selectWidth ? props.selectWidth + 100 : '300px',
      }"
    >
      <div id="look_year">
        <svg
          t="1685091696133"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3345"
          width="20"
          height="20"
        >
          <path
            d="M735.208665 65.582671l-446.41733 446.417329 446.41733 446.417329z"
            p-id="3346"
            fill="#2c2c2c"
          ></path>
        </svg>
        <svg
          style="margin-left: 10px"
          t="1685091725565"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3548"
          width="20"
          height="20"
        >
          <path
            d="M677.391515 873.916768c-7.86101 0-15.618586-2.999596-21.617778-8.895354L324.473535 533.721212c-11.998384-11.894949-11.998384-31.340606 0-43.235555L655.670303 159.288889c5.999192-5.999192 13.756768-8.895354 21.617778-8.895354 7.757576 0 15.618586 2.999596 21.617778 8.895354 11.894949 11.894949 11.894949 31.237172 0 43.235555L389.223434 512.103434 698.905859 821.785859c11.894949 11.998384 11.894949 31.340606 0 43.235555-5.895758 5.895758-13.756768 8.895354-21.514344 8.895354z m0 0"
            fill="#666666"
            p-id="3549"
          ></path>
        </svg>
        <div style="flex: 1; text-align: center">
          <span class="change_color" style="margin-right: 10px; cursor: pointer"
            >{{ titleTime.year }}年</span
          >
          <span class="change_color" style="cursor: pointer"
            >{{ titleTime.month }}月</span
          >
        </div>
        <svg
          style="margin-right: 10px"
          t="1685091771600"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4725"
          width="20"
          height="20"
        >
          <path
            d="M761.6 489.6l-432-435.2c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l416 416-416 425.6c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l432-441.6C771.2 515.2 771.2 499.2 761.6 489.6z"
            p-id="4726"
            fill="#2c2c2c"
          ></path>
        </svg>
        <svg
          t="1685091754287"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4522"
          width="20"
          height="20"
        >
          <path
            d="M288.791335 65.582671l446.41733 446.417329-446.41733 446.417329z"
            p-id="4523"
            fill="#2c2c2c"
          ></path>
        </svg>
      </div>
      <div style="margin-top: 20px; display: flex">
        <div
          style="flex: 1; user-select: none; text-align: center"
          v-for="item in timesStatus.week"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  selectWidth: String,
  selectHeight: String,
});

const titleTime = reactive({
  year: "",
  month: "",
});

const timesStatus = reactive({
  status: false,
  week: ["日", "一", "二", "三", "四", "五", "六"],
});

// 获取当前时间
const getNowTime = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  titleTime.year = year;
  titleTime.month = month;
};
getNowTime();

// 改变时间
const changeTime = () => {
  let data = new Date()
  console.log(data.getDay(), "某一天");
  console.log(data.setDate());
};
changeTime();
</script>

<style scoped lang="scss">
input {
  outline: none;
  border: 1px solid #f3f3f3;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
#look_year {
  display: flex;
  align-items: center;
}
svg {
  cursor: pointer;
}
.change_color:hover {
  color: rgb(0, 221, 255);
}
</style>
