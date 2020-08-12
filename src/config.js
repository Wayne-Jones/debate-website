import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBVU7Drhw6M-5dxSJc9m0kSJhW3R4f7TrQ",
    authDomain: "debate-website-b170d.firebaseapp.com",
    databaseURL: "https://debate-website-b170d.firebaseio.com",
    projectId: "debate-website-b170d",
    storageBucket: "debate-website-b170d.appspot.com",
    messagingSenderId: "156457005313",
    appId: "1:156457005313:web:ca319d98cb775c5572eb00"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;