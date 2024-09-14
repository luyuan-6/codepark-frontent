<template>
  <div id="UserLoginView">
    <video
      src="../../assets/user/loginBack.mp4"
      autoplay="true"
      loop="true"
      muted="true"
      playbackRate="3.0"
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
    <div class="curved-block element"></div>
    <img
      src="../../assets/user/login1.png"
      alt=""
      class="elementC elementD"
      style="
        position: absolute;
        top: -60px;
        left: 20px;
        z-index: 20;
        width: 59%;
      "
    />
    <div class="parallelogram" style="height: 110px"></div>
    <div
      class="parallelogram"
      style="height: 100px; margin-left: 50px; background-color: #d2e0f3"
    ></div>
    <div
      class="parallelogram"
      style="height: 160px; background-color: #4584fe; margin-left: 100px"
    ></div>
    <div
      class="parallelogram"
      style="height: 260px; background-color: #1345c2; margin-left: 150px"
    ></div>
    <div
      class="parallelogram"
      style="
        height: 120px;
        background-color: rgba(67, 130, 216, 0.72);
        margin-left: 250px;
      "
    ></div>
    <div
      class="parallelogram box"
      style="
        height: 200px;
        width: 650px;
        background-color: #4545d3;
        margin-left: 990px;
        margin-top: 25px;
      "
    ></div>
    <div class="curved-blockC elementC"></div>
    <!--    以上是页面装饰（不用管）-->
    <!--    以下是登录卡片内容-->
    <a-card id="card" class="elementC">
      <a-form
        :model="form"
        layout="vertical"
        @submit="handleSubmit"
        style="max-width: 400px; margin: 0 auto"
      >
        <h2>用户登录</h2>
        <!--        账号密码登录-->
        <div v-if="AccountLogin == true">
          <a-form-item field="userAccount" label="账号">
            <a-input v-model="form.userAccount" placeholder="请输入账号 " />
          </a-form-item>
          <a-form-item
            field="userPassword"
            tooltip="密码不少于 8 位"
            label="密码"
          >
            <a-input-password
              v-model="form.userPassword"
              placeholder="请输入密码 "
            />
          </a-form-item>
        </div>
        <!--        手机验证码登录-->
        <div v-if="PhoneLogin == true && AccountLogin == false">
          <a-form-item label="手机号">
            <a-input placeholder="请输入您的手机号" />
          </a-form-item>
          <a-form-item
            label="验证码"
            field="code"
            :rules="[
              { required: true, message: '需要验证码' },
              { minLength: 7, message: '验证码不完整' },
              { match: /^\d+$/, message: '必须是数字' },
            ]"
          >
            <a-verification-code style="width: 45%" />
            <a-button
              style="width: 30%; margin-left: 20%"
              type="primary"
              htmlType="submit"
              >发送验证码</a-button
            >
          </a-form-item>
        </div>
        <!--        登录阅读协议-->
        <a-form-item>
          <a-checkbox v-model="checkIs"></a-checkbox>
          <a-link @click="dialogFormVisible = true"
            >我已阅读并同意相关协议</a-link
          >
        </a-form-item>
        <a-form-item>
          <a-button
            html-type="submit"
            type="primary"
            :size="'large'"
            shape="round"
            style="width: 60%; margin: 0 auto; top: -10px; bottom: -10px"
            >登录
          </a-button>
        </a-form-item>
        <a-space style="margin: 0 auto; margin-top: -40px">
          <icon-phone
            size="30px"
            class="iconD"
            v-if="PhoneLogin == false"
            @click="
              () => {
                AccountLogin = false;
                PhoneLogin = true;
              }
            "
            style="left: 80px; margin: 30px"
          />
          <icon-user
            size="30px"
            class="iconD"
            v-if="AccountLogin == false"
            @click="
              () => {
                AccountLogin = true;
                PhoneLogin = false;
              }
            "
            style="margin: 30px"
          />
          <icon-qq size="30px" class="iconD" style="margin: 30px" />
          <icon-wechat size="30px" class="iconD" style="margin: 30px" />
          <icon-github size="30px" class="iconD" style="margin: 30px" />
        </a-space>
      </a-form>
    </a-card>
    <!--     弹窗,可关闭-->
    <!-- 使用v-if来确保在内容加载之前不显示对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      title="Code-Park"
      width="600"
      style="color: #1345c2; font-size: 40px"
    >
      <a-scrollbar style="height: 500px; overflow: auto">
        <div style="margin-bottom: 20px">
          <div style="font-size: 25px; font-weight: bold">用户协议</div>
          <div style="font-size: 16px">
            <div style="margin-bottom: 20px">
              <br />
              <div>
                欢迎使用我们的代码练习平台（以下简称“本平台”）。在使用本平台之前，请您仔细阅读以下用户协议
                （以下简称“本协议”）。一旦您点击接受或开始使用本平台，即表示您同意本协议的所有条款。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">一、服务条款</div>
              <div>
                本平台为用户提供代码练习、学习和交流的服务。用户可以在本平台上编写、测试和分享代码，
                参与讨论和互助。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">二、用户注册</div>
              <div>
                2.1 用户在使用本平台的某些功能之前需要注册账户。
                <br />
                2.2
                用户应提供真实、准确、最新和完整的信息，并对所提供的信息的真实性和合法性负责。
                <br />
                2.3
                用户有责任保持账户信息的保密，并对使用其账户进行的所有活动负责。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">
                三、用户行为规范
              </div>
              <div>
                3.1
                用户在本平台上应遵守相关法律法规，不得发布违法、违规或侵权的内容。
                <br />
                3.2
                用户不得使用本平台进行任何形式的商业活动，包括但不限于广告推广、销售产品或服务。
                <br />
                3.3
                用户应尊重其他用户的知识产权和个人信息，不得侵犯他人的合法权益。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">
                四、内容的使用
              </div>
              <div>
                4.1
                用户在本平台上发布的内容仅代表用户个人的观点和立场，与本平台无关。
                <br />
                4.2
                本平台不对用户发布的内容承担责任，但有权根据法律法规和平台规则对违规内容进行处理。
                <br />
                4.3 用户应确保其发布的内容不侵犯他人的知识产权和其他合法权益。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">五、免责声明</div>
              <div>
                5.1
                本平台提供的服务是“按现状”提供的，不保证服务的持续性、可靠性和适用性。
                <br />
                5.2 本平台不对用户发布的内容的准确性和合法性承担责任。
                <br />
                5.3 用户应自行承担因使用本平台而造成的任何损失或损害。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">六、协议修改</div>
              <div>
                本平台保留对本协议进行修改的权利。修改后的协议将在平台上发布，并即时生效。用户在修改后继续
                使用本平台的服务，即视为接受修改后的协议。
              </div>
              <br />
              <div style="font-size: 20px; font-weight: bold">七、其他</div>
              <div>
                7.1 本协议的解释、适用及争议的解决均受中华人民共和国法律的管辖。
                <br />
                7.2 本协议自发布之日起生效。
              </div>
              <br />
              <div>感谢您选择使用我们的代码练习网页，祝您学习愉快！</div>
            </div>
          </div>
        </div>
      </a-scrollbar>
      <template #footer>
        <div class="dialog-footer" style="margin: 0 auto; margin-top: 10px">
          <a-button
            type="primary"
            shape="round"
            style="float: left; margin-left: 40px"
            @click="dialogFormVisible = false"
            >取 消</a-button
          >
          <a-button
            type="primary"
            shape="round"
            style="top: -17px; margin-right: 40px"
            @click="(dialogFormVisible = false), (checkIs = true)"
          >
            阅读并同意
          </a-button>
        </div>
      </template>
    </el-dialog>
    <!--    弹窗结束-->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
// 弹窗显示开关
const dialogFormVisible = ref(false);
//协议
const checkIs = ref(false);

// 账号登陆(默认为true)
const AccountLogin = ref(true);
//手机验证码登录(默认false)
const PhoneLogin = ref(false);

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  await store.dispatch("user/getLoginUser");
  if (checkIs.value) {
    // 登录成功 跳转到首页
    if (res.code == 0) {
      await router.push({
        path: "/",
        replace: true,
      });
    } else {
      message.error("登录失败，" + res.message);
    }
  } else {
    message.error("请先阅读并同意用户协议");
  }
};
</script>
<style scoped>
#UserLoginView {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}
#card {
  float: right;
  margin: 190px auto;
  right: 30px;
  width: 400px;
  height: 400px;
  z-index: 10;
}

.curved-block {
  width: 40%;
  max-height: 100%;
  border-bottom: 838px solid rgba(39, 154, 248, 0.36);
  border-right: 400px solid transparent;
  margin-left: -10%;
  z-index: 1;
  position: fixed;
}

.curved-block:after {
  content: "";
  width: 40%;
  border-bottom: 838px solid rgba(117, 172, 245, 0.36);
  border-right: 1008px solid transparent;
  margin-left: -10%;
  z-index: 1;
  position: fixed;
}

.curved-block:before {
  content: "";
  width: 40%;
  border-bottom: 838px solid rgba(126, 181, 236, 0.36);
  border-right: 400px solid transparent;
  margin-left: -10%;
  z-index: 1;
  position: fixed;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInC {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes float {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes shrink {
  0% {
    transform: scaleY(0);
    font-size: 100%;
  }
  50% {
    transform: scaleY(2.8);
    font-size: 40%;
  }
  100% {
    transform: scaleY(0);
    font-size: 10%;
  }
}

.element {
  animation: slideIn 5s forwards;
}

.elementC {
  animation: slideInC 1.7s forwards;
}

.elementD {
  animation: float 10s infinite;
}

.curved-blockC {
  width: 0;
  height: 0;
  position: fixed;
  border-left: 300px solid transparent;
  border-top: 400px;
  right: 0;
  top: 0;
  z-index: 30;
}

.parallelogram {
  width: 50px;
  height: 50px;
  position: fixed;
  margin-top: 800px;
  background-color: #2e2eea;
  transform: skewY(95deg);
  transition: transform 0.9s ease-in-out;
  z-index: 30;
  animation: shrink 10s infinite;
}

@keyframes colors {
  0% {
    background-color: rgba(181, 216, 252, 0.84);
  }
  10% {
    background-color: rgba(142, 178, 246, 0.66);
  }
  50% {
    background-color: rgba(109, 142, 250, 0.59);
  }
  100% {
    background-color: rgba(175, 201, 255, 0.84);
  }
}

.box {
  transform: skewY(45deg);
  animation: colors 10s linear infinite running;
}

.iconD {
  margin: 0 auto;
  color: #173b96;
  margin-top: -40px;
}

.iconD:hover {
  color: #177cef;
}
</style>
