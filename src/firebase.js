import firebase from "firebase";
import "firebase/auth";


const config = {
  apiKey: "AIzaSyAfO9j5SwYSccDFIxQBQczo_4jF4z97gZE",
  authDomain: "vue-sample-75ba6.firebaseapp.com",
  projectId: "vue-sample-75ba6",
  storageBucket: "vue-sample-75ba6.appspot.com",
  messagingSenderId: "395526206099",
  appId: "1:395526206099:web:35b46ad1e61e08b014d366",
  measurementId: "G-JXPD2HG05M"
};

firebase.initializeApp(config);

export default firebase;