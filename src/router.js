import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Article from './views/Article';
import store from '@/store/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: []
    },
    {
      path: '/:slug',
      name: 'Article',
      component: Article,
      beforeEnter: (to, from, next) => {
        const { slug } = to.params;
        const location = store.getters.locationsFormatted.find(l => l.slug === slug);
        if (from.name === null) {
          store.dispatch('setActiveLocationId', location.id);
          store.dispatch('toggleShowArticle', true);
        }
        next();
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path == from.path && to.hash !== '') return;
  // if (!store.getters.getDataLoaded) {
  const map = store.dispatch('setMapStyle');
  const data = store.dispatch('setLocations');

  Promise.all([map, data]).then(() => {
    store.dispatch('toggleDataLoaded', true);
    next();
  });
  // }
});

export default router;
