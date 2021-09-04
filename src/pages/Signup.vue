<template>
  <div class='signup'>
    <h2>新規登録</h2>
    <table>
    <tr>
      <th>ユーザーネーム:</th>
    <input type='text' placeholder='Username' v-model='username'>
    </tr>
    <tr>
      <th>メールアドレス:</th>
    <input type='email' placeholder='example@example.com' v-model='mailaddress'>
    </tr>
    <tr>
      <th>パスワード:</th>
    <input type='password' placeholder='Password' v-model='password'>
    </tr>
    </table>
    <br>
    <button class='button-login' @click='SignUp'>新規登録</button>
      <router-link to='/signin'>ログインはこちらから</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      mailaddress: '',
      password: ''
    }
  },
  methods: {
    SignUp: function () {
      firebase.auth().createUserWithEmailAndPassword(
        this.mailaddress,
        this.password)
        .then(user => {
          user.user.updateProfile({
            displayName: user.username
          });
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
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