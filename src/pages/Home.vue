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

    <h1 class="title">ユーザ一覧</h1>
    <table>
      <thead>
        <tr class="headContainer">
          <th class="leftHead">ユーザ名</th>
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

<style scoped>
.title {
  text-align: center;
}

button {
  color: #fff;
  background-color: #1da1f3;
  border-radius: 20px;
  display: inline-block;
  border: none;
}

button:hover {
  background-color: #5fb1f1;
}

button:focus {
  outline: 0px;
}

.logOutBtn {
  margin: 10px auto;
  height: 40px;
  width: 120px;
  font-size: 16px;
}

.userInfo {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.logOut {
  float: right;
  margin: 0 8% 40px 0;
}

table {
  margin: 0 auto;
  width: 60%;
}

.leftHead {
  width: 200px;
  height: 40px;
  float: left;
  text-align: center;
}
.rightHead {
  width: 120px;
  height: 40px;
}

.button2 {
  height: 30px;
  width: 120px;
  font-size: 16px;
}

.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 300ms ease-out;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: opacity 300ms ease-out;
}
</style>
