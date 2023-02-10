/* eslint-disable no-unused-vars */
import {initializeApp} from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import {getFirestore, } from 'firebase/firestore'

//Firebase auth
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAssO7uEfJFnB-MoKi18G9_82f4pxlJj2Y",
    authDomain: "cursoreactfirebase-ef591.firebaseapp.com",
    projectId: "cursoreactfirebase-ef591",
    storageBucket: "cursoreactfirebase-ef591.appspot.com",
    messagingSenderId: "1000124326157",
    appId: "1:1000124326157:web:a02cf94e20e8758a5c5044",
    measurementId: "G-24PWSVQYKF"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
  //Firestore config
const fireStoreDB = getFirestore(firebaseApp)
  //analytics
const analytics = getAnalytics(firebaseApp);

const firebaseAuth = getAuth(firebaseApp);

export {fireStoreDB, firebaseAuth};

