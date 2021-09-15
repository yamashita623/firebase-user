import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    user: '',
    displayName: '',
  },
  getters: {
    getStatus(state) {
      return state.status;
    },
    getUser(state) {
      return state.user;
    },
    getUserName(state) {
      return state.displayName;
    },
  },

  mutations: {
    onUserStatusChanged(state, status) {
      state.status = status;
    },
    setUpDateUser(state, user) {
      state.user = user;
    },
    setUpDateDisplayName(state, user) {
      state.displayName = user;
    },
    resetState(state) {
      const getDefaultState = () => {
        return {
          status: '',
          user: '',
          displayName: '',
        };
      };
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    async signUpUser({ commit }, userInfo) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
          displayName: userInfo.userName,
        });
        commit('setUpDateUser', user);
        commit('setUpDateDisplayName', user.displayName);
        router.push('/home');
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
          commit('setUpDateUser', user);
          commit('setUpDateDisplayName', user.displayName);
          router.push('/home');
        })
        .catch((e) => {
          alert(e.message);
        });
    },
    displayName() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userName = user.displayName;
        }
      });
    },
    logoutUser() {
      firebase.auth().signOut();
      this.commit('resetState');
      router.push('/signin');
    },
  },
});
