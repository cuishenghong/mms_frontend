// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import VueAxios from "vue-axios";
import axios from "axios";

import "element-ui/lib/theme-chalk/index.css";
import "./components/Style/main.css";
import "./components/Style/dictionary.css";
import App from "./App";
import router from "./router";

import { get, post } from "./config/common/index";
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$post = post;
Vue.prototype.$get = get;

//将axios挂载到原型上
Vue.prototype.$axios = axios;

//配置全局的axios默认值（可选）

axios.defaults.headers.common["Authorization"] = "testHeader";
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
    axios.defaults.withCredentials = true
 
/* eslint-disable no-new */
var app = new Vue({
    el: "#app",
    /* 创建和挂载根实例 */
    router,
    components: { App },
    template: "<App/>",
});
