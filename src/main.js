// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { post } from './config/common/index'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

Vue.use(ElementUI)
Vue.prototype.$post = post

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  /* 创建和挂载根实例 */
  router,
  components: { App },
  template: '<App/>'
})
