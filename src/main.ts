import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
//引入拦截器
import "./plugin/axiosInterceptors";
import "./accessManage/index";

/**
 * 引入Markdown文本编辑器
 * 安装: npm install @bytemd/vue-next
 */
import "bytemd/dist/index.css";
createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
