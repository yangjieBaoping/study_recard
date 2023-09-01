<template>
  <div
    class="input_box"
    :style="{
      width: props.selectWidth ? props.selectWidth : '200px',
      height: props.selectHeight ? props.selectHeight : '35px',
    }"
  >
    <input
      type="text"
      @click="changeTime"
      style="width: calc(100% - 40px)"
      v-model="showTime.value"
      placeholder="当前时间"
    />
    <div class="img_box">
      <svg
        v-if="timesStatus.clear_btn"
        @click="eliminate_btn"
        t="1684986896378"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2402"
        width="20"
        height="20"
      >
        <path
          d="M512 960c-247.039484 0-448-200.960516-448-448S264.960516 64 512 64 960 264.960516 960 512 759.039484 960 512 960zM512 128.287273c-211.584464 0-383.712727 172.128262-383.712727 383.712727 0 211.551781 172.128262 383.712727 383.712727 383.712727 211.551781 0 383.712727-172.159226 383.712727-383.712727C895.712727 300.415536 723.551781 128.287273 512 128.287273z"
          fill="#bfbfbf"
          p-id="2403"
        ></path>
        <path
          d="M557.05545 513.376159l138.367639-136.864185c12.576374-12.416396 12.672705-32.671738 0.25631-45.248112s-32.704421-12.672705-45.248112-0.25631l-138.560301 137.024163-136.447897-136.864185c-12.512727-12.512727-32.735385-12.576374-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.248112l136.255235 136.671523-137.376804 135.904314c-12.576374 12.447359-12.672705 32.671738-0.25631 45.248112 6.271845 6.335493 14.496116 9.504099 22.751351 9.504099 8.12794 0 16.25588-3.103239 22.496761-9.247789l137.567746-136.064292 138.687596 139.136568c6.240882 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.591372-9.34412 12.512727-12.480043 12.54369-32.704421 0.063647-45.248112L557.05545 513.376159z"
          fill="#bfbfbf"
          p-id="2404"
        ></path>
      </svg>
    </div>
  </div>
  <div
    v-if="timesStatus.hours_minute"
    :style="{
      width: props.selectWidth ? props.selectWidth : '200px',
    }"
  >
    <div style="border-radius: 5px; border: 1px solid #f3f3f3">
      <div id="hours_minute_box">
        <div class="hours_minute_box_item" ref="one_hour">
          <div
            ref="hours_minute_box_items"
            class="hour"
            @click="sureTime"
            @mousewheel="scrollTime($event)"
            v-for="item in timesList.hours"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="hours_minute_box_item" ref="one_minte">
          <div
            ref="hours_minute_box_items"
            class="minute"
            @click="sureTime"
            @mousewheel="scrollTime($event)"
            v-for="item in timesList.minutes"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="hours_minute_box_item" ref="one_second">
          <div
            ref="hours_minute_box_items"
            class="second"
            @click="sureTime"
            @mousewheel="scrollTime($event)"
            v-for="item in timesList.seconds"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div style="border-top: 1px solid #f3f3f3">
        <Button width="50" height="30" value="确定" type="success"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  selectWidth: String,
  selectHeight: String,
})

const showTime = reactive({
  value: '',
})

// 时间数组
const timesList = reactive({
  // 小时
  hours: [],
  // 分钟
  minutes: [],
  // 秒
  seconds: [],
})

// 时间弹窗状态
const timesStatus = reactive({
  // 点击次数
  click_num: 0,
  // 输入框清除按钮
  clear_btn: false,
  // 时分弹窗
  hours_minute: false,
})

// 当前时间
const nowTime = reactive({
  hour: '',
  minute: '',
  second: '',
})

// 元素
const one_hour = ref('')
const one_minte = ref('')
const one_second = ref('')
const hours_minute_box_items = ref('')

// 获取初始化时间
const initializationTime = () => {
  let H = new Date().getHours() >= 10 ? new Date().getHours() : `0${new Date().getHours()}`
  let M = new Date().getMinutes() >= 10 ? new Date().getMinutes() : `0${new Date().getMinutes()}`
  let S = new Date().getSeconds() >= 10 ? new Date().getSeconds() : `0${new Date().getSeconds()}`
  showTime.value = `${H}:${M}:${S}`
  nowTime.hour = H
  nowTime.minute = M
  nowTime.second = S

  // 初始数据
  // 小时
  for (let i = 0; i < 23; i++) {
    timesList.hours.push(i)
  }
  // 分
  for (let i = 0; i < 59; i++) {
    timesList.minutes.push(i)
  }
  // 秒
  for (let i = 0; i < 59; i++) {
    timesList.seconds.push(i)
  }
}
initializationTime()

// 自动滚动到当前时间
const getScrollTime = () => {
  // 获取元素
  let box_items = hours_minute_box_items.value[0]
  one_hour.value.scrollTop = box_items.offsetHeight * nowTime.hour
  one_minte.value.scrollTop = box_items.offsetHeight * nowTime.minute
  one_second.value.scrollTop = box_items.offsetHeight * nowTime.second
}

const changeTime = () => {
  timesStatus.click_num += 1
  timesStatus.hours_minute = true
  setTimeout(() => {
    getScrollTime()
  })
}

// 确认时间
const sureTime = e => {
  let str = e.target.className.split(' ')[1]
  let newStr = showTime.value
  if (newStr) {
    if (str === 'hour') {
      showTime.value = `${e.target.innerText}:${newStr.split(':')[1]}:${newStr.split(':')[2]}`
    } else if (str === 'minute') {
      showTime.value = `${newStr.split(':')[0]}:${e.target.innerText}:${newStr.split(':')[2]}`
    } else {
      showTime.value = `${newStr.split(':')[0]}:${newStr.split(':')[1]}:${e.target.innerText}`
    }
  } else {
    if (str === 'hour') {
      showTime.value = `${e.target.innerText}:${nowTime.minute}:${nowTime.second}`
    } else if (str === 'minute') {
      showTime.value = `${nowTime.hour}:${e.target.innerText}:${nowTime.second}`
    } else {
      showTime.value = `${nowTime.hour}:${nowTime.minute}:${e.target.innerText}`
    }
  }
  // timesStatus.hours_minute = false;
}

// 关闭
const eliminate_btn = () => {
  timesStatus.clear_btn = false
  showTime.value = ''
}

// 鼠标滚轮事件
const scrollTime = e => {
  let data = hours_minute_box_items.value[0].offsetHeight
  switch (e.target.className) {
    case 'hour': {
      if (e.wheelDelta > 0) {
        setTimeout(() => {
          one_hour.value.scrollTop -= data * 3
        })
      } else {
        setTimeout(() => {
          one_hour.value.scrollTop += data * 3
        })
      }
      break
    }
    case 'minute': {
      if (e.wheelDelta > 0) {
        setTimeout(() => {
          one_minte.value.scrollTop -= data * 3
        })
      } else {
        setTimeout(() => {
          one_minte.value.scrollTop += data * 3
        })
      }
      break
    }
    case 'second': {
      if (e.wheelDelta > 0) {
        setTimeout(() => {
          one_second.value.scrollTop -= data * 3
        })
      } else {
        setTimeout(() => {
          one_second.value.scrollTop += data * 3
        })
      }
      break
    }
  }
}
</script>

<style scoped lang="scss">
.input_box {
  display: flex;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  .img_box {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  height: 192px;
  display: flex;
}

.hours_minute_box_item {
  flex: 1;
  overflow-y: scroll;
  text-align: center;
}
.hours_minute_box_item::before,
.hours_minute_box_item::after {
  content: '';
  height: 80px;
  display: block;
}
.hours_minute_box_items {
  line-height: 30px;
  cursor: pointer;
  user-select: none;
}
.hours_minute_box_item > div {
  line-height: 32px;
  cursor: pointer;
  user-select: none;
}
.hours_minute_box_item > div:hover {
  background-color: #f6f1f1;
  color: red;
}

// 统一清除滚动条
.hours_minute_box_item::-webkit-scrollbar {
  display: none;
}
</style>
