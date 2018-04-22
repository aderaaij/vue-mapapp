import Vue from 'vue';
import Vuex from 'vuex';
import data from './modules/data';
import ui from './modules/ui';

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: false,
  modules: {
    data,
    ui
  }
});

export default store;
