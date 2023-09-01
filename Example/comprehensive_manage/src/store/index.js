import { createStore } from 'vuex'

export default createStore({
  state: {
    messageData: {
      status: false,
      /**
       * 成功  success
       * 警告  warming
       * 失败  danger
       */
      type: 'success',
      value: undefined,
    },
  },
  getters: {},
  mutations: {
    changeMessage(state, payload) {
      state.messageData.status = true
      state.messageData.type = payload.type
      state.messageData.value = payload.value
    },
  },
  actions: {},
  modules: {},
})
