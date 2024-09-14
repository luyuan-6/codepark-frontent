<template>
  <div id="globalHeader">
    <div
      class="grid-demo"
      :wrap="false"
      style="margin: 0; background-color: white; height: 60px; width: 100%"
    >
      <div>
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '30px' }"
            disabled
          >
            <div class="titlebar">
              <img class="logo" src="../assets/logo.png" />
              <div class="title" style="margin-top: 10px">Code-Park</div>
            </div>
          </a-menu-item>
          <a-menu-item
            v-for="item in visibleRoutes"
            :key="item.path"
            style="
              font-size: 16px;
              font-family: 'Roboto', sans-serif;
              color: #5d5d5d;
            "
          >
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
      <div
        style="
          background-color: white;
          position: absolute;
          left: 85%;
          margin-top: -60px;
          height: 60px;
        "
      >
        <div v-if="user == null">
          <a-button
            type="primary"
            @click="router.push('/user/login')"
            style="margin: 5px 5px"
            >登录
          </a-button>
          <a-button type="primary" @click="router.push('/user/register')"
            >注册
          </a-button>
        </div>
        <div v-else>
          <a-space size="large">
            <a-avatar :size="40" :image-url="userUrl" @click="toUserCenter">
              {{ user.userName }}
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar>
            <a-button type="primary" class="logoutButton" @click="logout"
              >退出</a-button
            >
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/access_enum";

// 获取可视的页面
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (
      !checkAccess(store.state.user?.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }

    return true;
  });
});
// 默认主页
const selectedKeys = ref(["/"]);
// 获取路由
const router = useRouter();

// 获取全局用户信息
const store = useStore();
// {{ store.state.user?.loginUser?.userName ?? "未登录" }} 显示用户名变成另外一个形式
const user = ref(store.state.user?.loginUser);
const userUrl = ref(store.state.user?.loginUser.userAvatar);
// 实现自动登录
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    username: "路远",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 1000);

//点击菜单项跳转到相应路由
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 刷新页面 更新当前选中的菜单项 重新加载该页面
router.afterEach((to, from, falure) => {
  selectedKeys.value = [to.path];
});

// 退出登录
const logout = () => {
  store.dispatch("user/logoutUser");
  user.value = null;
  router.push("/");
};
// 去用户中心页面
const toUserCenter = () => {
  router.push("/user/center");
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titlebar {
  display: flex;
  z-index: 100;
}
.titlebar .logo {
  height: 45px;
}
.titlebar .title {
  color: rgb(69, 81, 211);
  font-family: "Roboto", sans-serif;
  margin-left: 10px;
  font-size: 20px;
}

.logoutButton {
  background-color: #4545d3ff !important ;
  transition: transform 0.2s; /* 动画 */
  :deep(.el-button__wrapper) {
    box-shadow: 0 0 5px rgb(87, 87, 255); /* 霓虹边框效果，可以根据需求调整颜色和模糊度 */
    border-radius: 20px; /* 设置圆角半径 */
    cursor: default;
    .el-button__inner {
      cursor: default !important;
    }
  }
}
.logoutButton:hover {
  background: linear-gradient(45deg, #3b55da, #1068c0);
  transform: scale(1.1); /* （120% 缩放按钮动态*/
}
</style>
