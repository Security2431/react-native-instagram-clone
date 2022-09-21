import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNmbEQYADFcaicWMVC4kHw6OyHbIITnFo",
  authDomain: "react-native-instagram-c-d1151.firebaseapp.com",
  projectId: "react-native-instagram-c-d1151",
  storageBucket: "react-native-instagram-c-d1151.appspot.com",
  messagingSenderId: "911945492950",
  appId: "1:911945492950:web:25aae7f8e9d69159239c77",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
