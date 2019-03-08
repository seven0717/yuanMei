import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';

import '@/config/rem';
import './axios/index'
import Api from './axios/api'

Vue.config.productionTip = false;
Vue.prototype.api = Api;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
