<template>
  <div>
    <div class="home">
      <div class="logOut">
        <button class="logOutBtn" @click="logoutUser">ログアウト</button>
      </div>
      <div class="userInfo">
      <span>{{ getUserName }}さんようこそ！！</span>
      <span>残高 : {{ getMyWallet }}</span>
      </div>
    </div>

    <h2>ユーザ一覧</h2>
    <table>
      <thead>
        <tr>
          <th>ユーザ名</th>
        </tr>
      </thead>
      <tr v-for="(user, index) in getAllUsers" v-bind:key="index">
        <td class="leftHead">{{ user.name }}</td>
        <td class="rightHead">
          <button
            class="button2"
            :data-name="user.name"
            :data-MyWallet="user.MyWallet"
            @click="openModal(index)"
          >
            Walletを見る
          </button>
        </td>
        <td class="rightHead">
          <button
            class="button2"
            :data-uid="user.uid"
            :data-MyWallet="user.MyWallet"
            :data-index="index"
            @click="openModal2(index)"
          >
            送る
          </button>
        </td>
      </tr>
    </table>

    <div>
      <transition>
        <Modal
          v-bind:name="getIsName"
          v-bind:MyWallet="getIsMyWallet"
          v-if="showContent"
          @close="closeModal"
        ></Modal>
      </transition>
    </div>

    <div>
      <transition>
        <Modal2
          v-bind:val="getMyWallet"
          v-if="showContent2"
          @close="closeModal2"
          @send="send(getTransfer)"
        ></Modal2>
      </transition>
    </div>
  </div>
</template>

<script>
import Modal from '../modal/modal1.vue';
import Modal2 from '../modal/modal2.vue';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      showContent: false,
      showContent2: false,
      usersIndex: '',
    };
  },
  components: {
    Modal,
    Modal2,
  },
  computed: mapGetters([
    'getUserName',
    'getMyWallet',
    'getAllUsers',
    'getTransfer',
    'getIsName',
    'getIsMyWallet',
  ]),

  created() {
    this.$store.dispatch('displayName', this);
    this.$store.dispatch('setAllUsers', this);
  },
  methods: {
    ...mapMutations(['sendMoney', 'checkMyWallet']),
    logoutUser() {
      this.$store.dispatch('logoutUser', this);
    },
    openModal() {
      this.checkMyWallet('data-name', 'data-MyWallet');
      this.showContent = true;
    },
    openModal2() {
      this.sendMoney('data-uid', 'data-MyWallet', 'data-index');
      this.showContent2 = true;
    },
    closeModal() {
      this.showContent = false;
    },
    closeModal2() {
      this.showContent2 = false;
    },
    send(getTransfer) {
      if (getTransfer.match(/^([1-9]\d*|0)$/)) {
        this.$store.dispatch('updateUserWallet', getTransfer);
      } else {
        alert('0以上の整数で入力してください');
      }
      this.$store.commit('resetSendForm');
    },
  },
};
</script>


