import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import { AccessType } from "@/accessManage/checkAccess";

export default {
  namespaced: true,
  //用户的状态信息
  state: () => ({
    loginUser: null,
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
    async getLoginUser({ commit, state }) {
      //远程获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      console.log("调用getLoginUser", res.data);

      if (res.code === 0) {
        commit("updateUser", res.data);
        console.log("更新用户信息", state.loginUser);
      } else {
        commit("updateUser", {
          username: "游客",
          userRole: AccessType.NotLogin,
        });
      }
    },
  },
} as StoreOptions<any>;
