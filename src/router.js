import Vue from 'vue';
import Router from 'vue-router';
import Signin from './pages/Signin.vue';
import Signup from './pages/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Signin },
    { path: '/signup', component: Signup },
  ]
});