import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import firebase from 'firebase'
 
Vue.use(Router)
 
let router = new Router({
    routes: [
        {
            path: '*',
            redirect: 'signin'
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/firebase',
            name: 'firebase',
            component: firebase
        },
    ]
})
 
export default router