import { createStore } from "vuex";

export default createStore({
  state: {
    // 全局设置
    settings: {},
    // 完整服务信息
    useFullServiceStatus: false,
    // 通用弹窗
    PublicData: {
      value: "",
      status: false,
    },
    // 活动是否结束
    isEndActive: false,
  },
  getters: {},
  mutations: {
    // 保存全局设置
    saveSettings(state, payload) {
      state.settings = payload;
    },
    // 改变通用弹窗状态
    chengePublicData(state, payload) {
      if (payload) {
        state.PublicData.value = payload;
      }
      state.PublicData.status = !state.PublicData.status;
    },
    changeUFullServiceStatus(state, payload) {
      state.useFullServiceStatus = payload;
    },
  },
  modules: {},
});
