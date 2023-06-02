<template>
  <div
    :style="{
      width: props.selectWidth ? props.selectWidth : '200px',
      height: props.selectHeight ? props.selectHeight : '35px',
    }"
  >
    <input
      type="text"
      @click="opData"
      placeholder="选择日期"
      v-model="titleTime.nowTime"
    />
    <div
      style="margin-top: 10px; padding: 10px; border: 1px solid #666"
      :style="{
        width: props.selectWidth ? props.selectWidth + 100 : '300px',
      }"
      v-if="timesStatus.status"
    >
      <div id="look_year">
        <svg
          @click="addYear(false)"
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
          @click="addMonth(false)"
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
          <span
            class="change_color"
            style="margin-right: 10px; cursor: pointer"
            @click="getYear"
            >{{ titleTime.year }}年</span
          >
          <span class="change_color" style="cursor: pointer" @click="getMonth"
            >{{ titleTime.month }}月</span
          >
        </div>
        <svg
          @click="addMonth(true)"
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
          @click="addYear(true)"
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
      <div style="margin-top: 20px">
        <div v-if="timesStatus.data_status">
          <div style="display: flex">
            <div
              style="flex: 1; user-select: none; text-align: center"
              v-for="item in timesStatus.week"
              :key="item"
            >
              {{ item }}
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr)">
            <div
              v-for="item in timesStatus.dayList"
              :key="item"
              style="text-align: center; cursor: pointer"
              @click="sureDate(item)"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div
          v-if="timesStatus.year_status"
          style="display: grid; grid-template-columns: repeat(4, 1fr)"
        >
          <div
            v-for="item in 10"
            :key="item"
            style="text-align: center; cursor: pointer"
            @click="sureYear(titleTime.year + item)"
          >
            {{ titleTime.year + item }}
          </div>
        </div>
        <div
          v-if="timesStatus.month_status"
          style="display: grid; grid-template-columns: repeat(4, 1fr)"
        >
          <div
            v-for="item in 12"
            :key="item"
            style="text-align: center; cursor: pointer"
            @click="sureMonth(item)"
          >
            {{ item }}
          </div>
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
  nowTime: "",
});

const timesStatus = reactive({
  status: false,
  year_status: false,
  month_status: false,
  data_status: false,
  week: ["一", "二", "三", "四", "五", "六", "日"],
  dayList: [],
});

// 获取某个月份第一天和最后一天
const getAllData = (year, month) => {
  let frist_day = new Date(year, month, 1);
  let end_day = new Date(year, month + 1, 0);
  let arr = [];
  arr.push({
    frist: new Date(frist_day).getDay(),
    end: new Date(end_day).getDay(),
    day: new Date(end_day).getDate(),
  });
  return arr;
};

// 改变时间
const changeTime = (year, month) => {
  timesStatus.dayList = [];
  let now_month = getAllData(year, month);
  let previous_month = getAllData(year, month - 1);
  if (now_month[0].frist === 1) {
    for (let i = 0; i < now_month[0].day; i++) {
      timesStatus.dayList.push({
        value: i + 1,
        status: "now",
      });
    }
    let Num = 42 - now_month[0].day;
    for (let i = 0; i < Num; i++) {
      timesStatus.dayList.push({
        value: i + 1,
        status: "last",
      });
    }
  } else {
    for (let i = 0; i < now_month[0].frist - 1; i++) {
      timesStatus.dayList.unshift({
        value: previous_month[0].day - i,
        status: "previous",
      });
    }
    for (let i = 0; i < now_month[0].day; i++) {
      timesStatus.dayList.push({
        value: i + 1,
        status: "now",
      });
    }
    if (timesStatus.dayList.length < 42) {
      let Num = 42 - timesStatus.dayList.length;
      for (let i = 0; i < Num; i++) {
        timesStatus.dayList.push({
          value: i + 1,
          status: "last",
        });
      }
    }
  }
};

// 获取当前时间
const getNowTime = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  titleTime.year = year;
  titleTime.month = month + 1;
  changeTime(year, month);
};
getNowTime();

// 修改月份
const addMonth = (status) => {
  if (status) {
    titleTime.month += 1;
    if (titleTime.month > 12) {
      titleTime.month = 1;
      titleTime.year += 1;
    }
  } else {
    titleTime.month -= 1;
    if (titleTime.month < 1) {
      titleTime.month = 12;
      titleTime.year -= 1;
    }
  }
  changeTime(titleTime.year, titleTime.month - 1);
};
const addYear = (status) => {
  if (status) {
    titleTime.year += 1;
  } else {
    titleTime.year -= 1;
  }
  changeTime(titleTime.year, titleTime.month - 1);
};

// 选中时间
const sureDate = (data) => {
  let M = titleTime.month;
  if (data.status === "previous") {
    M = M - 1;
  } else if (data.status === "last") {
    M = M + 1;
  }
  titleTime.nowTime = `${titleTime.year}-${M}-${data.value}`;
  timesStatus.data_status = false;
  timesStatus.status = false;
  changeTime(titleTime.year, titleTime.month - 1);
};

const sureYear = (value) => {
  titleTime.year = value;
  timesStatus.year_status = false;
  timesStatus.month_status = true;
};

const sureMonth = (value) => {
  titleTime.month = value;
  timesStatus.month_status = false;
  timesStatus.data_status = true;
};

const opData = () => {
  timesStatus.status = true;
  timesStatus.data_status = true;
};
const getYear = () => {
  timesStatus.year_status = true;
  timesStatus.month_status = false;
  timesStatus.data_status = false;
};
const getMonth = () => {
  timesStatus.year_status = false;
  timesStatus.month_status = true;
  timesStatus.data_status = false;
};
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
