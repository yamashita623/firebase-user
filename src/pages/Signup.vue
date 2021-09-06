<template>
  <div class='signup'>
    <h2>新規登録</h2>
    <table>
    <tr>
      <th>ユーザーネーム:</th>
    <input type='text' placeholder='UserName' v-model='userInfo.userName'>
    </tr>
    <tr>
      <th>メールアドレス:</th>
    <input type='email' placeholder='example@example.com' v-model='userInfo.email'>
    </tr>
    <tr>
      <th>パスワード:</th>
    <input type='password' placeholder='Password' v-model='userInfo.password'>
    </tr>
    </table>
    <br>
    <button class='button-login' @click='SignUp'>新規登録</button>
      <router-link to='/signin'>ログインはこちらから</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
      userName: '',
      email: '',
      password: ''
    }}
  },
  methods: {
    SignUp(){this.$store.dispatch('signupUser',this.userInfo)
}}}
</script>

<style scoped>
h1, h2 {
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
  align-items: center
} 
.button-login {
  color: #4297b9;
}
</style>