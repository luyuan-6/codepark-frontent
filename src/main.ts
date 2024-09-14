import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入arco
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
// 引入axios
import "@/plugins/axios";
// 引入bytemd
import "bytemd/dist/index.css";

//1.引入Element框架相关内容
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//2.引入EL图标相关内容 https://element-plus.org/zh-CN/component/icon.html#注册所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

createApp(App)
  .use(ElementPlus)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .mount("#app");
