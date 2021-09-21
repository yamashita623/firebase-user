<template>
  <div class="overlay" v-show="showContent">
    <div class="main-content">
      <div  v-for="(user,index) in users" v-bind:key="index">
      <p>{{ user.name }}さんの残高</p>
      <p>{{ user.myWallet}}</p>
      </div>
      <div id="button-content">
        <p>
          <button @click="closeModal" class="modal-button">close</button>
        </p>
      </div>
    </div>
  </div>
</template>



<script>
import firebase from "firebase";
export default {
  data() {
    return {
      showContent: false,
      userData:[],
    };
  },
  methods: {
    openModal() {
      this.$emit("open", this.showContent);
    },
    closeModal() {
      this.$emit("close", this.showContent);
    },
      returnUserData(id) {
      const userData = this.userData.find((user) => user.uid === id);
      return userData;
    },
  },

  mounted() {


    firebase.auth().onAuthStateChanged(() => {
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
          this.userData.push(data);
        });
      });


    });
  },
};
</script>