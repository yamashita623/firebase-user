import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
    password: '',
    status: false
  },
  getters: {
    email(state) {
      return state.email;
    },
    password(state) {
      return state.password;
    },
    userName(state) {
      return state.userName;
    },
    status(state) {
      return state.status
    },
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setUsername(state, userName) {
      state.userName = userName;
    },
    onUserStatusChanged(state,status) {
      state.status = status;
    },
  },
  actions: {
    signUpUser({ commit }, userInfo) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((response) => {
          console.log(response);
          const user = firebase.auth().currentUser;
          commit('setEmail', user.email);
          commit('setPassword', user.password);
          commit('setUsername', user.userName);
          router.push('/');
        })
        .catch((e) => {
          console.log(e);
        });
    },
    signInUser({ commit }, userInfo) {
      firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then((response) => {
        console.log(response);
        commit('onUserStatusChanged', true)
        const user = firebase.auth().currentUser;
          commit('setEmail', user.email);
          commit('setPassword', user.password);
          commit('setUsername', user.userName);
          router.push('/Signup');
      })
      .catch((e) => {
          console.log(e);
        });
    }
  },
});