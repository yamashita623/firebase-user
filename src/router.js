import Vue from 'vue';
import Router from 'vue-router';
import Signin from './pages/Signin.vue';
import Signup from './pages/Signup.vue';
import Home from './pages/Home.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    {
      path: '/home',
      component: Home,
      beforeEnter(to, from, next) {
        if (store.getters.getStatus) {
          next();
        } else {
          next('/signin');
        }
      },
    },
  ],
});
