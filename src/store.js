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
    AllUsers: [],
    isUid: '',
    isBalance: '',
    sendBoxIndex: '',
    transfer: '',
    isName: '',
    isMyWallet: '',
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
    getAllUsers(state) {
      return state.AllUsers;
    },
    getTransfer(state) {
      return state.transfer;
    },
    getIsName(state) {
      return state.isName;
    },
    getIsMyWallet(state) {
      return state.isMyWallet;
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
    setAllUsers(state, user) {
      state.AllUsers = user;
    },
    resetState(state) {
      const getDefaultState = () => {
        return {
          status: '',
          user: '',
          displayName: '',
          MyWallet: '',
          AllUsers: [],
        };
      };
      Object.assign(state, getDefaultState());
    },
    updateMyWallet(state, getTransfer) {
      state.MyWallet = state.MyWallet - getTransfer;
    },
    updateDestinationWallet(state, getTransfer) {
      state.AllUsers[state.sendBoxIndex].MyWallet += Number(getTransfer);
    },
    resetSendForm(state) {
      state.transfer = null;
      state.isName = null;
      state.isMyWallet = null;
    },
    sendMoney(state) {
      state.isUid = event.currentTarget.getAttribute('data-uid');
      state.isBalance = event.currentTarget.getAttribute('data-MyWallet');
      state.sendBoxIndex = event.currentTarget.getAttribute('data-index');
    },
    checkMyWallet(state) {
      state.isName = event.currentTarget.getAttribute('data-name');
      state.isMyWallet = event.currentTarget.getAttribute('data-MyWallet');
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
          uid: user.uid,
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
          const uid = firebase.auth().currentUser.uid;
          db.collection('users')
            .where('uid', '==', uid)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                commit('setUpDateMyWallet', doc.data().MyWallet);
              });
            });
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
    setAllUsers() {
      const DB = [];
      const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;
      firebase
        .firestore()
        .collection('users')
        .where(firebase.firestore.FieldPath.documentId(), '!=', currentUser.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              uid: doc.data().uid,
              name: doc.data().name,
              MyWallet: doc.data().MyWallet,
            };
            DB.push(data);
            this.commit('setAllUsers', DB);
          });
        });
    },
    async updateUserWallet({ state, commit }, getTransfer) {
      const isMyUid = firebase.auth().currentUser.uid;
      try {
        const receiverDocs = await db
          .collection('users')
          .where('uid', '==', state.isUid)
          .get();
        const receiverId = receiverDocs.docs[0].id;
        const senderDocs = await db
          .collection('users')
          .where('uid', '==', isMyUid)
          .get();
        const senderId = senderDocs.docs[0].id;
        await db.runTransaction(async (transaction) => {
          // 送金される側
          await transaction.update(db.collection('users').doc(receiverId), {
            MyWallet: firebase.firestore.FieldValue.increment(
              Number(getTransfer)
            ),
          });
          commit('updateDestinationWallet', getTransfer);
          // 送金する側
          await transaction.update(db.collection('users').doc(senderId), {
            MyWallet: firebase.firestore.FieldValue.increment(
              -Number(getTransfer)
            ),
          });
          commit('updateMyWallet', getTransfer);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
