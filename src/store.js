import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router.js';
import db from './main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    user: '',
    displayName: '',
    MyWallet: '',
    users:[],
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
    getMyWallet(state) {
      return state.MyWallet;
    },
    getUsers(state){
      return state.users;
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
    setUpDateMyWallet(state, user) {
      state.MyWallet = user;
    },
    resetState(state) {
      const getDefaultState = () => {
        return {
          status: '',
          user: '',
          displayName: '',
          MyWallet:'',
        };
      };
      Object.assign(state, getDefaultState());
    },
    setUsersData(state, users) {
      state.users = users
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
        db.collection('users').doc().set({
          name: userInfo.userName,
          MyWallet: 1000,
          uid: user.uid
        });
        commit('onUserStatusChanged', true);
        commit('setUpDateUser', user);
        commit('setUpDateDisplayName', user.displayName);
        commit('setUpDateMyWallet', 1000);
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
          commit('setUpDateMyWallet', 1000);
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
