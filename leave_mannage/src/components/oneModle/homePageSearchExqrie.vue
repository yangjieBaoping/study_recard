<template>
  <div style="padding: 0px 10px">
    <div style="display: flex">
      <div class="persennum_item" style="flex: 1">
        <img src="../../assets/images/3.webp" width="20" height="20" alt="" />
        <span style="margin-left: 5px; font-size: 14px">访问数：</span>
        <span class="persennum_item_number">{{ numData.num }}</span>
      </div>
      <div class="persennum_item" style="margin-left: 10px">
        <img src="../../assets/images/4.webp" width="20" height="20" alt="" />
        <span style="margin-left: 5px; font-size: 14px">报名数：</span>
        <span class="persennum_item_number">{{ numData.participateNum }}</span>
      </div>
    </div>
    <!-- 倒计时 -->
    <div class="expire_time">
      <div v-if="expireData.time" style="font-size: 20px; font-weight: bolder">
        活动未开始，敬请期待
      </div>
      <div
        v-if="!expireData.time && !$store.state.isEndActive"
        style="display: flex; align-items: center; font-size: 14px"
      >
        <div
          :style="{
            width: expireData.width === 280 ? '50px' : '100%',
          }"
        >
          倒计时距结束
        </div>
        <div style="display: flex; align-items: center">
          <div class="expire_time_number">
            {{ expireData.day }}
          </div>
          天
          <div class="expire_time_number">
            {{ expireData.houers }}
          </div>
          时
          <div class="expire_time_number">
            {{ expireData.minute }}
          </div>
          分
          <div class="expire_time_number">
            {{ expireData.second }}
          </div>
          秒
        </div>
      </div>
      <div
        v-if="$store.state.isEndActive"
        style="font-size: 20px; font-weight: bolder"
      >
        活动已结束
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useStore } from "vuex";

const $store = new useStore();

const props = defineProps({
  data: Number,
});

const numData = reactive({
  num: 0,
  participateNum: 0,
});

const expireData = reactive({
  // 天
  day: "",
  // 时
  houers: "",
  // 分
  minute: "",
  //秒
  second: "",
  // 活动是否开始时间
  time: true,
  // 记录宽度
  width: window.innerWidth,
});

const getData = () => {
  numData.num = $store.state.settings[55].value;
};
getData();

//获取活动倒计时
const getExpireTime = async () => {
  expireData.time =
    $store.state.settings[47].value > parseInt(new Date().getTime() / 1000);
  let result = $store.state.settings[48].value * 1000;
  // 获取现在正确时间
  let expireTimw = setInterval(() => {
    let nowTimw = new Date().getTime();
    // 时间差
    let D_value = result - nowTimw;
    // 当活动结束时停止定时器
    if (D_value <= 0) {
      clearInterval(expireTimw);
      $store.state.isEndActive = true;
    } else {
      expireData.day = Math.floor(D_value / 1000 / 60 / 60 / 24);
      expireData.houers = Math.floor((D_value / 1000 / 60 / 60) % 24);
      expireData.minute = Math.floor((D_value / 1000 / 60) % 60);
      expireData.second = Math.floor((D_value / 1000) % 60);
      // 补零
      if (expireData.day < 10) {
        expireData.day = `0${expireData.day}`;
      }
      if (expireData.houers < 10) {
        expireData.houers = `0${expireData.houers}`;
      }
      if (expireData.minute < 10) {
        expireData.minute = `0${expireData.minute}`;
      }
      if (expireData.second < 10) {
        expireData.second = `0${expireData.second}`;
      }
    }
  }, 10);
};
getExpireTime();

watch(
  () => props.data,
  (newValue) => {
    numData.participateNum = newValue;
  }
);
</script>

<style scoped lang="scss">
.persennum_item {
  padding: 10px 0px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  align-items: center;
}
.persennum_item_number {
  font-weight: bold;
  user-select: none;
  color: #374f92;
  font-family: Tsanger08;
  font-size: 17px;
}
.expire_time {
  height: 50px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  //颜色渐变
  background-image: linear-gradient(
    to right,
    rgb(177, 13, 13),
    rgb(243, 103, 78)
  );
  color: white;
}
.expire_time_number {
  padding: 0px 5px;
  background-color: yellow;
  color: black;
  border-radius: 10px;
  margin: 0px 5px;
}
</style>
