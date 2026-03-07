import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  //用户的状态信息
  state: () => ({
    loginUser: {
      username: "游客",
      role: "notLogin",
    },
  }),

  // getters

  // 修改用户的状态信息
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },

  // 触发异步操作，调用mutations
  actions: {
    getLoginUser: ({ commit, state }, payload) => {
      commit("updateUser", { userName: "阳" });
    },
  },
} as StoreOptions<any>;
