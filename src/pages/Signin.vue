<template>
  <div class="signin">
    <h2>ログイン画面</h2>
    <table>
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
    <button class="button-login" @click="SignIn">ログイン</button>
    <router-link to="/signup"><span>新規登録はこちらから</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    SignIn() {
      this.$store.dispatch('signInUser', this);
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
.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.button-login {
  color: #4297b9;
  width: 100px;
  height: 30px;
}

input:focus {
  border: 2px solid blue;
  outline: none;
}
</style>
