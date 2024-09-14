import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/access_enum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      // userName: "未登录",
    },
  }),
  actions: {
    // 改为远程请求获取登录信息
    async getLoginUser({ commit, state }, payload) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
    // 改为远程请求退出登录
    async logoutUser({ commit }) {
      // 调用退出登录的API接口
      const res = await UserControllerService.userLogoutUsingPost();

      // 根据返回的code判断操作是否成功
      if (res.code === 0) {
        // 清除用户信息
        commit("clearUser");
        // 可能还需要处理其他状态重置，比如token过期等
      } else {
        // 处理登出失败的情况，可以根据项目需求进行错误处理
        console.error("Logout failed:", res.message);
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
