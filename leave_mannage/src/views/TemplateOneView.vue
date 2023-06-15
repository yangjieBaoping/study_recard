<template>
  <div class="content_width">
    <div v-if="assemblyStatus.homeStatus">
      <!-- 头部 -->
      <homePageHeader />
      <!-- 倒计时 -->
      <homePageSearchExqrie :data="transferData.pernum" />
      <!-- 搜索 -->
      <div class="content_body_search">
        <input
          type="text"
          @input="getFocus"
          ref="searchValue"
          placeholder="请输入名称或编号查询选手"
        />
        <div
          class="content_body_search_button"
          @click="
            () => {
              $store.state.allPropStatus.trackState = true;
            }
          "
        >
          <div class="content_body_search_status">已更新</div>
        </div>
      </div>
      <div class="content" @scroll="scrollEvent($event)">
        <!-- 列表 -->
        <homePageList :data="transferData.listObj" />
        <!-- 底部附加文字 -->
        <div class="copyright" v-if="$store.state.settings[2].value">
          {{ $store.state.settings[85].value }}
        </div>
        <!-- 隐藏底部技术支持信息 -->
        <div style="text-align: center" v-if="$store.state.settings[6].value">
          {{ $store.state.settings[88].value }}
        </div>
        <div style="text-align: center" v-if="$store.state.settings[39].value">
          {{ $store.state.settings[91].value }}
        </div>
      </div>
      <div class="footer">
        <img
          @click="openFeedback"
          src="../assets/images/24.webp"
          style="width: 35px; height: 50px"
          alt=""
        />
        <img
          @click="customerSure"
          src="../assets/images/25.webp"
          style="width: 35px; height: 50px"
          alt=""
        />
        <div class="footer_item2">
          <div
            style="background-color: #f28412"
            class="footer_btn"
            @click="activeRull"
          >
            活动详情
          </div>
        </div>
        <div class="footer_item2">
          <div
            style="background-color: #1c4d9f"
            class="footer_btn"
            @click="goEnroll"
          >
            我要报名
          </div>
        </div>
      </div>
      <!-- <useFullService v-if="$store.state.allPropStatus.useFullServiceStatus" /> -->
    </div>
    <div v-else>2</div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import homePageHeader from "@/components/oneModle/homePageHeader.vue";
import homePageSearchExqrie from "@/components/oneModle/homePageSearchExqrie.vue";
import homePageList from "@/components/oneModle/homePageList.vue";
const $store = new useStore();

const assemblyStatus = reactive({
  homeStatus: true,
});

// 父组件向子组件传递的数据
const transferData = reactive({
  pernum: 0,
  listObj: {
    list: [],
    status: false,
    number: 0,
  },
});

const scrollEvent = async (e) => {
  console.log(e);
};
</script>

<style scoped lang="scss">
.content_body_search {
  display: flex;
  justify-content: space-between;
  background-color: #f3f3f3;
  padding: 10px 10px;
  input {
    width: 65%;
    padding: 10px;
    outline: none;
    border: 1px solid #f3f3f3;
    color: #b8b8b8;
    font-size: 14px;
  }
  user-select: none;
}
.content_body_search_button {
  width: 95px;
  background-image: url("../assets/images/5.webp");
  background-size: 100% 120%;
  background-position: 0px 52%;
  position: relative;
}
.content_body_search_status {
  position: absolute;
  z-index: 2;
  top: -9px;
  right: -10px;
  background-color: red;
  padding: 2px;
  color: #ffffff;
  border-radius: 5px 0px 5px 0px;
  font-size: 12px;
}
.content {
  padding: 10px;
  height: calc(100vh - 445px);
  overflow-y: scroll;
}
.content::-webkit-scrollbar {
  display: none;
}
.footer {
  padding: 10px 10px 0px;
  height: 48px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  border: 1px solid #f3f3f3;
  color: white;
}
.footer_item2 {
  grid-column: span 2 / auto;
}
.footer_btn {
  text-align: center;
  line-height: 48px;
}
</style>
