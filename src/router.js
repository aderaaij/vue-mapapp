import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Article from './views/Article';

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
    { path: '/article/:slug', name: 'Article', component: Article }
  ]
});
