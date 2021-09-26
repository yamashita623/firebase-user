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
      <tr v-for="(user, index) in users" v-bind:key="index">
        <td>{{ user.name }}</td>
        <td>
          <button class="button2" @click="openModal(user, index)">
            Walletを見る
          </button>
        </td>
        <td>
          <button class="button2" @click="openModal2(index)">送る</button>
        </td>
      </tr>
    </table>

    <div>
      <transition>
        <Modal
          v-bind:val="usersIndex"
          v-if="showContent"
          @close="closeModal"
        ></Modal>
      </transition>
    </div>

    <div>
      <transition>
        <Modal2
          v-bind:val="usersIndex"
          v-if="showContent2"
          @close="closeModal2"
        ></Modal2>
      </transition>
    </div>
  </div>
</template>

<script>
import Modal from '../modal/modal1.vue';
import Modal2 from '../modal/modal2.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      userName: '',
      showContent: false,
      showContent2: false,
      usersIndex: '',
      users: [],
    };
  },
  components: {
    Modal,
    Modal2,
  },
  computed: mapGetters(['getUserName', 'getMyWallet', 'getAllUsers']),

  created() {
    this.$store.dispatch('displayName', this);
    this.$store.dispatch('getAllUsersDB', this);
  },
  mounted() {
    this.users = this.getAllUsers;
    this.userName = this.getUserName;
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser', this);
    },
    openModal(user) {
      console.log(user);
      this.usersIndex = user;
      this.showContent = true;
    },
    closeModal() {
      this.showContent = false;
    },
    closeModal2() {
      this.showContent2 = false;
    },
  },
};
</script>
