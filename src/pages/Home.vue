<template>
  <div>
    <div class='login-message-area'>
      <div>
        <span>{{ userName }}さんようこそ！！</span>
      </div>

      <div>
        <span>残高 : 1000</span>
        <button>ログアウト</button>
      </div>
    </div>

    <h1>ユーザ一覧</h1>

    <div class='user-list-wrapper'>
      <h4>ユーザ名</h4>

      <ul class='user-list'>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
        <li>
          <span>TEST</span>
          <form>
            <button>walletを見る</button>
            <button>送る</button>
          </form>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      userName: ''
    }},
    computed: mapGetters(['getUserName']),
    created() {
      this.$store.dispatch('displayName', this);
    },
     mounted() {
    this.userName = this.getUserName
  }
};

</script>
