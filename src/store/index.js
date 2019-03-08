import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations.js';
import actions from './acions.js';

Vue.use(Vuex);

const state = {
  tabs:'/',       //记录当前tabbar
};

export default new Vuex.Store({
  state:state,
  mutations,
  actions
})
