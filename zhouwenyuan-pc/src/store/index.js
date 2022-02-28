import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      isLogin: false,
      username: "",
      userId: "",
    }
  },
  mutations: {
    login(state, userInfo) {
      state.userInfo.isLogin = true;
      state.userInfo.username = userInfo.username;
      state.userInfo.userId = userInfo.id;
    },
    logout(state) {
      state.userInfo.isLogin = false;
      state.userInfo.username = "";
    },
  },
  actions: {
  },
  modules: {
  }
})

