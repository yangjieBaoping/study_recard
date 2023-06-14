import { createStore } from "vuex";

export default createStore({
  state: {
    // 全局设置
    settings: {},
    // 所有弹窗状态
    allPropStatus: {
      // 反馈
      feedbackState: false,
      // 跟踪报道
      trackState: false,
      // 客服
      iscustomerService: false,
      // 报名
      isenroll: false,
      // 通用弹窗开启或关闭属性
      publicDataStatus: false,
      // 支持成功
      successData: false,
      // 二维码
      isOpenQscode: false,
      // 验证码
      isVerificationCode: false,
      // 选手详情
      isAthleteInformation: false,
      // 今日之星
      todayStarStatus: false,
      // 欢迎回来
      welcomeStateStatus: false,
      // 礼物
      giftStateStatus: false,
      // 底部组件
      useFullServiceStatus: false,
      /**
       * 这下边的为第二版本状态
       */
      isAthleteInformation1: false,
      giftStateStatus1: false,
      qsCode: false,
      activeStatus: false,
    },
    // 点赞时防止多次触发的标记
    isDownLike: true,
    // 列表加载状态
    loadingStatus: true,
    // 通用弹窗传递数据
    publicDataData: "",
    // 是否让通用弹窗高度自适应
    propHeight: false,
    // 选手列表数据
    // 出现滚动时
    informationData: [],
    // 搜索时
    informationData1: [],
    // 保存点击选手列表时的最后一项数据
    athleteLastData: {
      avator: "",
      count: 0,
      detail: "",
      key: "",
      name: "",
      pk: 0,
      vote_id: 0,
      idx: 0,
      ranking: 0,
    },
    tableData: {
      // 选手报名数
      totalNum: 0,
      // 选手列表总页数
      athletePageNum: 0,
    },
    // 活动是否结束
    isEndActive: false,
    // 滚动触底次数
    buttonNum: 1,
    // 判断是否为搜索状态
    isSerchStatus: false,
    // 搜索值
    searchValue: "",
    currentClickAlht: 0,
    ruleState: false,
    // 模板二活动规则
    ruleState1: false,
    codeError: false,
    // 判断用户每天初次进入是否点赞
    isVote: false,
    // 是否进入投诉页面
    getComplaint: false,
    // 投诉界面
    complaint: false,
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
        state.allPropStatus.publicDataStatus = true;
        state.publicDataData = payload;
      } else {
        state.allPropStatus.publicDataStatus = false;
      }
    },
    // 判断通用弹窗高度是否需要自适应
    getPropHeight(state, payload) {
      state.propHeight = payload;
    },
    // 更新最后点击选手数据
    changAthleteData(state, payload) {
      state.athleteLastData = { ...payload };
      if (payload.img) {
        state.athleteLastData.avator = payload.img;
      }
    },
    // 获取选手列表总数和总页数
    getListNum(state, data) {
      state.tableData = { ...data };
    },
    // 更新选手列表
    changUpdataList(state, payload) {
      state.informationData = [...payload];
    },
    // 搜索时触发状态
    changSerchData(state, payload) {
      if (!payload) {
        state.isSerchStatus = false;
        state.informationData1 = [];
      } else {
        state.isSerchStatus = true;
        state.informationData1 = [...payload];
      }
    },
    changeCurrentClick(state, payload) {
      if (!payload) return;
      state.currentClickAlht = payload;
    },
    changeUFullServiceStatus(state, payload) {
      state.allPropStatus.useFullServiceStatus = payload;
    },
    changeRules(state) {
      state.ruleState = !state.ruleState;
    },
    changeRules1(state) {
      state.ruleState1 = !state.ruleState1;
    },
    changeCodeError(state) {
      state.codeError = !state.codeError;
    },
  },
  modules: {},
});
