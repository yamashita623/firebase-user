<template>
  <div class="signin">
    <h2>ログイン画面</h2>
    <table>
    <tr>
      <th>メールアドレス:</th>
    <input type="email" placeholder="example@example.com" v-model="mailaddress">
    </tr>
    <tr>
      <th>パスワード:</th>
    <input type="password" placeholder="Password" v-model="password">
    </tr>
    </table>
    <br>
    <button @click='SignIn'>ログイン</button>
      <router-link to="/Signup">新規登録はこちらから</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data () {
    return {
      mailaddress: '',
      password: ''
    }
  },
  methods: {
    SignIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.mailaddress, this.password).then(
       () => {
          alert('Success!')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }}}
</script>

<style scoped>
h1, h2 {
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
  align-items: center
}


</style>