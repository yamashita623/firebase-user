import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: false,
    user: ''
  },
  getters: {
    getStatus(state) {
      return state.status
    },
    getUser(state) {
      return state.user
    },
    getUserName(state) {
      return state.user.displayName
    },
  },
  mutations: {
    onUserStatusChanged(state,status) {
      state.status = status;
    },
    setUpDateUser(state, user) {
            state.user = user;
    },
  },
  actions: {
     async signUpUser({ commit },userInfo) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: userInfo.userName
        });
        commit('setUpDateUser',user)
        router.push('/Home');
      } catch (e) {
        alert(e.message);
      }
    },
    signInUser({ commit }, userInfo) {
      firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(() => {
        commit('onUserStatusChanged', true);
        const user = firebase.auth().currentUser;
          commit('setUpDateUser',user)
          router.push('/Home');
      })
      .catch((e) => {
          alert(e.message);
        });
    },
}});