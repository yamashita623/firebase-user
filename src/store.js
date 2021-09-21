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
    modalDatas:[],
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
    getModalDatas(state){
      return state.modalDatas;
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
    setUsersData(state, users) {
      state.users = users
    },
    setModalDatas(state, modalDatas) {
      state.modalDatas = modalDatas
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
    modalSet (context, usersIndex) {
      const modalDatas = [];
      const user = firebase.auth().currentUser
      const db = firebase.firestore();
      db.collection('users')
          .where(firebase.firestore.FieldPath.documentId(), "!=", user.uid)
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  const modalData = {
                      uid: usersIndex,
                      name: doc.data().name,
                      MyWallet: doc.data().MyWallet
                  }
                  modalDatas.push(modalData)
                  context.commit('setModalDatas', modalDatas)
                  console.log(modalDatas)
              });
              });
            }
  },
});
