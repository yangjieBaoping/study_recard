<template>
  <!-- 开场广告图 -->
  <div
    class="smegma_style"
    style="background-color: #00000074"
    @click="headData.advertisementImg.status = false"
    v-if="headData.advertisementImg.status"
  >
    <img
      class="state_img prop_width"
      :src="HOST2 + '/media/' + headData.advertisementImg.value"
      @click="(e) => e.stopPropagation()"
    />
  </div>
  <!-- 开场视频广告 -->
  <div
    class="smegma_style"
    style="background-color: #00000074"
    @click="headData.advertisementVideo.status = false"
    v-if="headData.advertisementVideo.status"
  >
    <video
      style="background-color: #000"
      class="state_img prop_width"
      :src="HOST2 + '/media/' + headData.advertisementVideo.value"
      @click="(e) => e.stopPropagation()"
    >
      您的浏览器不支持 video 标签。
    </video>
  </div>
  <div style="height: 200px; position: relative">
    <img
      style="width: 100%; height: 100%; position: absolute"
      :src="HOST2 + '/media/' + headData.imgUrl"
      alt=""
    />
    <!-- 设置顶部滚动文字 -->
    <div class="content_top_scroll_text" v-if="headData.scrollText.status">
      <div class="scroll_text_content">
        <span class="scroll_box">{{ headData.scrollText.value }}</span>
      </div>
    </div>
    <!-- 弹幕 -->
    <div
      class="content_top_popup"
      v-show="
        headData.barrageData.data.length && headData.barrageData.firingStatus
      "
    >
      <div class="scroll_text_content">
        <span class="scroll_box" v-for="item in headData.barrageData.data">{{
          item
        }}</span>
      </div>
    </div>
    <!-- 分享功能 -->
    <div
      class="Long_press_share"
      style="cursor: pointer"
      @click="LongPressShare"
    >
      分享活动
    </div>
  </div>
</template>

<script setup>
import { HOST2 } from "@/ENV";
import { reactive } from "vue";
import { useStore } from "vuex";
const $store = new useStore();
const headData = reactive({
  imgUrl: "",
  // 顶部滚动文字
  scrollText: {
    status: false,
    value: "",
  },
  // 弹幕
  barrageData: {
    status: false,
    firingStatus: false,
    data: [],
  },
  // 广告图
  advertisementImg: {
    status: false,
    value: "",
  },
  // 广告视频
  advertisementVideo: {
    status: false,
    value: "",
  },
});

// 获取数据
const getData = () => {
  headData.imgUrl = $store.state.settings[44].value;
  headData.scrollText.status = $store.state.settings[1].value;
  headData.scrollText.value = $store.state.settings[83].value;
  headData.advertisementImg.status = $store.state.settings[11].value;
  headData.advertisementImg.value = $store.state.settings[84].value;
  headData.advertisementVideo.status = $store.state.settings[14].value;
  headData.advertisementVideo.value = $store.state.settings[86].value;
};
getData();

// 动画处理
const animating = () => {
  // 弹幕行数最多4行
  let piecesNumber = 1;
  let data = $store.state.settings[93].value;
  if (data === "[]") return;
  // 生成随机对应数量的索引
  for (let i = 0; i < piecesNumber; i++) {
    let len = Math.floor(Math.random() * data.length);
    headData.barrageData.data.push(data[len]);
  }
  setInterval(() => {
    for (let i = 0; i < piecesNumber; i++) {
      if (piecesNumber === 1) {
        headData.barrageData.data.splice(0, 1);
      }
      let len = Math.floor(Math.random() * data.length);
      headData.barrageData.data.push(data[len]);
    }
    if (headData.barrageData.data.length > 4) {
      headData.barrageData.data.splice(0, 1);
    }
  }, 5000);
};

// 是否支持弹幕并且运行
const isPopupAndStart = () => {
  if (!$store.state.settings[25].value) return;
  requestAnimationFrame(animating);
  headData.barrageData.firingStatus = true;
};

// isPopupAndStart();
</script>

<style scoped lang="scss">
.content_top_scroll_text {
  position: absolute;
  height: 30px;
  bottom: 8px;
  left: 0px;
  right: 0px;
  background-color: #cecece90;
  color: white;
  line-height: 30px;
  margin: 0 auto;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.scroll_text_content {
  .scroll_box {
    position: relative;
    margin: 0;
    font-size: 21px;
    line-height: 20px;
    animation: scroll 10s infinite linear;
    overflow: hidden;
    white-space: nowrap;
    line-height: 30px;
    text-align: center;
  }
}
@keyframes scroll {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
.content_top_popup {
  width: 100vw;
  text-align: end;
  overflow: hidden;
  z-index: 4;
  position: absolute;
  top: 0px;
}
.Long_press_share {
  position: absolute;
  z-index: 5;
  width: 40px;
  height: 40px;
  padding: 5px;
  text-align: center;
  border-radius: 50%;
  font-size: 15px;
  color: #ffffff;
  right: 5%;
  top: 7%;
  background-color: rgba(17, 84, 207, 0.5);
}
.state_img {
  height: 30%;
  border: 5px;
  border-radius: 5px;
}
</style>
