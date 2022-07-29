import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore' ;

const firebaseConfig = {
    apiKey: "AIzaSyAKoIjrf3HApHfVv8-uzxeluzi0_IQPHHk",
    authDomain: "netflix-clone-5d272.firebaseapp.com",
    projectId: "netflix-clone-5d272",
    storageBucket: "netflix-clone-5d272.appspot.com",
    messagingSenderId: "952051020737",
    appId: "1:952051020737:web:f288ebe512605c59a83540",
    measurementId: "G-901WPGNJRE"
  };


  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {auth}
  export default db;