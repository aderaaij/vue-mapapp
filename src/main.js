import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import { VueExtendLayout, layout } from 'vue-extend-layout';
Vue.use(VueExtendLayout);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  ...layout
}).$mount('#app');
