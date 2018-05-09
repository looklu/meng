// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Rem from '../static/js/rem'
import ResetCss from '../static/css/reset.css'
import router from './router'
// 引用API文件
import api from './api/index.js'
//将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Rem,
  ResetCss,
  components: { App },
  template: '<App/>'
})

Vue.prototype.nativeUserid = '';
Vue.prototype.nativeToken = '';
// Vue.prototype.nativeUserid = '4ccbfb57-9bec-4233-8ae0-e1f1066b2cb3';
// Vue.prototype.nativeToken = 'newmsz-1525665105973';

window["getUserInfo"] = function (userId,token) {
  Vue.prototype.nativeUserid = userId
  Vue.prototype.nativeToken = token
}

