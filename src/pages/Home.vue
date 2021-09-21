<template>
  <div>
    <div class="home">
      <div>
        <button @click="logoutUser">ログアウト</button>
        </div>
        <span>{{ userName }}さんようこそ！！</span>
        <span>残高 : {{ getMyWallet }}</span>
      
    </div>

    <h1>ユーザ一覧</h1>
    <table>
      <thead>
        <tr>
          <th>ユーザー</th>
        </tr>
      </thead>
      <tr v-for="(user,index) in users" v-bind:key="index">
        <td>{{user.name}}</td>
        <td><button class="button2" @click="openModal(user,index)">Walletを見る</button></td>
        <td><button class="button2" @click="openModal2(index)">送る</button></td>
      </tr>
    </table>
    <div>
        <transition>
          <Modal
           :val="usersIndex"
            v-show="showContent"
            @click="closeModal"
            @open="showContent = true"
            @close="showContent = false"
          ></Modal>
        </transition>
      </div>
    <div>
        <transition>
          <Modal2
           :val="usersIndex"
            v-show="showContent2"
            @click="closeModal2"
            @open="showContent2 = true"
            @close="showContent2 = false"
          ></Modal2>
        </transition>
      </div>
  </div>
</template>

<script>
import Modal from '../modal/modal1.vue';
import Modal2 from '../modal/modal2.vue';
import { mapGetters } from 'vuex';
import firebase from "firebase";

export default {
  data() {
    return {
      userName: '',
      showContent: false,
      showContent2: false,
      usersIndex:'',
      users:[],
    };
  },
  components: {
    Modal,
    Modal2,
  },
  computed: mapGetters(['getUserName','getMyWallet']),

  created() {
    this.$store.dispatch('displayName', this);
  },
  mounted() {
    this.userName = this.getUserName;

    const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;
      firebase
      .firestore()
      .collection("users")
      .where(firebase.firestore.FieldPath.documentId(), "!=", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = {
            name: doc.data().name,
            MyWallet: doc.data().MyWallet,
          };
          this.users.push(data);
        });
      });
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser', this);
    },
    openModal (user,index){
      console.log(user)
      this.showContent = true
      this.usersIndex = index
      const usersIndex = this.usersIndex
      this.$store.dispatch('modalSet', usersIndex)
    },
    closeModal (){
      this.showContent = false
    },
    closeModal2 (){
      this.showContent2 = false
    },
    
  },
};
</script>
