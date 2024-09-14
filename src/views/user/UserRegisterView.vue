<template>
  <!--  用户注册页-->
  <div id="UserView">
    <!--    背景视频  -->
    <video
      src="../../assets/user/register.mp4"
      autoplay="true"
      loop="true"
      muted="true"
      playbackRate="1.0"
      style="
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        object-fit: cover;
      "
    ></video>
    <!--    文字-->
    <div id="word" class="element">在Code-Park<br />编程从未如此快乐！</div>
    <a-card id="card" class="curved-blockC elementC">
      <a-form
        :model="form"
        :size="'large'"
        layout="vertical"
        @submit="handleSubmit"
        style="margin: 10px auto; height: 470px"
      >
        <h1 style="margin-top: -5px; color: #3f3f3f">用户注册</h1>
        <a-form-item field="userAccount" label="账号" style="margin-top: -10px">
          <a-input v-model="form.userAccount" placeholder="请输入账号 " />
        </a-form-item>
        <a-form-item
          field="userName"
          label="用户昵称"
          style="margin-top: -19px"
        >
          <a-input v-model="form.userName" placeholder="请输入用户昵称 " />
        </a-form-item>
        <a-form-item
          field="userPassword"
          tooltip="密码不少于 8 位"
          label="密码"
          style="margin-top: -19px"
        >
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码 "
          />
        </a-form-item>
        <a-form-item
          field="checkPassword"
          tooltip="密码不少于 8 位"
          label="确认密码"
          style="margin-top: -19px"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码 "
          />
        </a-form-item>

        <a-form-item>
          <a-button
            html-type="submit"
            type="primary"
            shape="round"
            style="width: 80%; margin: -20px auto"
            >注册
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: " ",
  userName: "",
} as UserRegisterRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功 跳转到首页
  if (res.code == 0) {
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>
<style scoped>
#UserView {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}
#card {
  margin: 170px auto;
  left: -330px;
  width: 470px;
  height: 480px;
  z-index: 10;
  border-radius: 20px;
}
#word {
  font-size: 80px;
  font-weight: bold;
  position: fixed;
  left: 48%;
  color: #fff;
  margin-top: 120px;
  margin-bottom: 20px;
}
@keyframes slideInC {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
.elementC {
  animation: slideInC 1.7s forwards;
}
@keyframes slide-out {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.element {
  transform: translateX(0);
  animation: slide-out 2.7s forwards;
}
</style>
