import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Article from './views/Article';
import store from './store/index';
import { stringToSlug } from './helpers';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: []
    },
    {
      path: '/article/:slug',
      name: 'Article',
      component: Article,
      beforeEnter: (to, from, next) => {
        const { slug } = to.params;
        store.dispatch('setLocations').then(res => {
          const currentItem = res.find(
            item => stringToSlug(item.fields.title).toUpperCase() == slug.toUpperCase()
          );
          console.log(currentItem);
          store.dispatch('setMapCenter', [
            currentItem.fields.coordinates.lon,
            currentItem.fields.coordinates.lat
          ]);
          next();
        });
      }
    }
  ]
});
