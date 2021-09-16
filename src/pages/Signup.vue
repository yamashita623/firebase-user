<template>
  <div class="signup">
    <h2>新規登録</h2>
    <table>
      <tr>
        <th>ユーザーネーム:</th>
        <input type="text" placeholder="UserName" v-model="userName" />
      </tr>
      <tr>
        <th>メールアドレス:</th>
        <input type="email" placeholder="example@example.com" v-model="email" />
      </tr>
      <tr>
        <th>パスワード:</th>
        <input type="password" placeholder="Password" v-model="password" />
      </tr>
    </table>
    <br />
    <button class="button-login" @click="SignUp">新規登録</button>
    <router-link to="/signin">ログインはこちらから</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    SignUp() {
      this.$store.dispatch('signUpUser', this);
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #4297b9;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.button-login {
  color: #4297b9;
}
</style>
