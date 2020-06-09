import * as firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBd3Q0hs3B7R8mdZ0lkj8a2Tm7P5fr30Y0",
    authDomain: "pictomap-9aad7.firebaseapp.com",
    databaseURL: "https://pictomap-9aad7.firebaseio.com",
    projectId: "pictomap-9aad7",
    storageBucket: "pictomap-9aad7.appspot.com",
    messagingSenderId: "618049548273",
    appId: "1:618049548273:web:2a877fab027777ae5d1e50",
    measurementId: "G-MKCJVYJEF9"
  };
  
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();