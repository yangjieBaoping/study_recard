<template>
  <div
    :style="{
      width: props.selectWidth ? props.selectWidth : '200px',
      height: props.selectHeight ? props.selectHeight : '35px',
    }"
  >
    <input type="text" @click="opData" placeholder="选择日期" v-model="titleTime.nowTime" />
    <div
      style="margin-top: 10px; padding: 10px; border: 1px solid #666"
      :style="{
        width: props.selectWidth ? props.selectWidth + 100 : '300px',
      }"
      v-if="timesStatus.status"
    >
      <div id="look_year">
        <svg
          viewBox="0 0 1024 1024"
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          @click="addYear(false)"
        >
          <path
            fill="currentColor"
            d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224zm256 0a29.12 29.12 0 0 1 41.728 0 30.592 30.592 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.592 30.592 0 0 1-.512 43.264 29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672l331.648-340.224z"
          ></path>
        </svg>
        <svg
          v-if="!timesStatus.year_status && !timesStatus.month_status"
          @click="addMonth(false)"
          style="margin-left: 10px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
        >
          <path
            d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
            fill="currentColor"
          ></path>
        </svg>
        <div style="flex: 1; text-align: center">
          <span class="change_color" style="margin-right: 10px; cursor: pointer" @click="getYear">
            {{ titleTime.year }}年
          </span>
          <span class="change_color" style="cursor: pointer" @click="getMonth">
            {{ titleTime.month }}月
          </span>
        </div>
        <svg
          v-if="!timesStatus.year_status && !timesStatus.month_status"
          @click="addMonth(true)"
          style="margin-right: 10px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
        >
          <path
            d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
            fill="currentColor"
          ></path>
        </svg>
        <svg
          viewBox="0 0 1024 1024"
          width="15"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          @click="addYear(true)"
        >
          <path
            fill="currentColor"
            d="M452.864 149.312a29.12 29.12 0 0 1 41.728.064L826.24 489.664a32 32 0 0 1 0 44.672L494.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L764.736 512 452.864 192a30.592 30.592 0 0 1 0-42.688zm-256 0a29.12 29.12 0 0 1 41.728.064L570.24 489.664a32 32 0 0 1 0 44.672L238.592 874.624a29.12 29.12 0 0 1-41.728 0 30.592 30.592 0 0 1 0-42.752L508.736 512 196.864 192a30.592 30.592 0 0 1 0-42.688z"
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
              :class="item.status === 'now' ? `change_color` : `time_color`"
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
            class="change_color"
            style="text-align: center; cursor: pointer"
            @click="sureYear(titleTime.year - 3 + item)"
          >
            {{ titleTime.year - 3 + item }}
          </div>
        </div>
        <div
          v-if="timesStatus.month_status"
          style="display: grid; grid-template-columns: repeat(4, 1fr)"
        >
          <div
            v-for="item in 12"
            :key="item"
            class="change_color"
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
import { reactive } from 'vue'

const props = defineProps({
  selectWidth: String,
  selectHeight: String,
})

const titleTime = reactive({
  year: '',
  month: '',
  nowTime: '',
})

const timesStatus = reactive({
  status: false,
  year_status: false,
  month_status: false,
  data_status: false,
  week: ['一', '二', '三', '四', '五', '六', '日'],
  dayList: [],
})

// 获取某个月份第一天和最后一天
const getAllData = (year, month) => {
  let frist_day = new Date(year, month, 1)
  let end_day = new Date(year, month + 1, 0)
  let arr = []
  arr.push({
    frist: new Date(frist_day).getDay(),
    end: new Date(end_day).getDay(),
    day: new Date(end_day).getDate(),
  })
  return arr
}

// 改变时间
const changeTime = (year, month) => {
  timesStatus.dayList = []
  // 当月
  let now_month = getAllData(year, month)
  // 上个月
  let previous_month = getAllData(year, month - 1)
  if (now_month[0].frist === 1) {
    for (let i = 0; i < now_month[0].day; i++) {
      timesStatus.dayList.push({ value: i + 1, status: 'now' })
    }
    let Num = 42 - now_month[0].day
    for (let i = 0; i < Num; i++) {
      timesStatus.dayList.push({ value: i + 1, status: 'last' })
    }
  } else {
    let previous = previous_month[0].end
    for (let i = 0; i < previous; i++) {
      timesStatus.dayList.push({ value: previous_month[0].day - i, status: 'previous' })
    }
    for (let i = 0; i < now_month[0].day; i++) {
      timesStatus.dayList.push({ value: i + 1, status: 'now' })
    }
    let Num = 42 - previous - now_month[0].day
    if (Num < 1) return
    for (let i = 0; i < Num; i++) {
      timesStatus.dayList.push({ value: i + 1, status: 'last' })
    }
  }
}

// 获取当前时间
const getNowTime = () => {
  let year = new Date().getFullYear()
  let month = new Date().getMonth()
  titleTime.year = year
  titleTime.month = month + 1
  changeTime(year, month)
}
getNowTime()

// 修改月份
const addMonth = status => {
  if (status) {
    titleTime.month += 1
    if (titleTime.month > 12) {
      titleTime.month = 1
      titleTime.year += 1
    }
  } else {
    titleTime.month -= 1
    if (titleTime.month < 1) {
      titleTime.month = 12
      titleTime.year -= 1
    }
  }
  changeTime(titleTime.year, titleTime.month - 1)
}
const addYear = status => {
  if (status) {
    if (timesStatus.year_status) {
      titleTime.year += 10
    } else {
      titleTime.year += 1
    }
  } else {
    if (timesStatus.year_status) {
      titleTime.year -= 10
    } else {
      titleTime.year -= 1
    }
  }
  changeTime(titleTime.year, titleTime.month - 1)
}

// 选中时间
const sureDate = data => {
  let M = titleTime.month
  if (data.status === 'previous') {
    M = M - 1
  } else if (data.status === 'last') {
    M = M + 1
  }
  titleTime.nowTime = `${titleTime.year}-${M}-${data.value}`
  timesStatus.data_status = false
  timesStatus.status = false
  changeTime(titleTime.year, titleTime.month - 1)
}

const sureYear = value => {
  titleTime.year = value
  timesStatus.year_status = false
  timesStatus.month_status = true
}

const sureMonth = value => {
  titleTime.month = value
  timesStatus.month_status = false
  timesStatus.data_status = true
  changeTime(titleTime.year, titleTime.month - 1)
}

const opData = () => {
  timesStatus.status = true
  timesStatus.data_status = true
}
const getYear = () => {
  timesStatus.year_status = true
  timesStatus.month_status = false
  timesStatus.data_status = false
}
const getMonth = () => {
  timesStatus.year_status = false
  timesStatus.month_status = true
  timesStatus.data_status = false
}
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
.time_color {
  color: #999;
}
</style>
