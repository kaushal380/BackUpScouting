import * as firebase from 'firebase/compat';
import '@firebase/auth';
import '@firebase/firestore';
import { initializeApp } from "@firebase/app";



  const firebaseConfig = {
    apiKey: "AIzaSyBHz8DLOSjTTHC-2GqIvUV8RyLmze6a_Hs",
    authDomain: "scouting-1a932.firebaseapp.com",
    projectId: "scouting-1a932",
    storageBucket: "scouting-1a932.appspot.com",
    messagingSenderId: "116241143679",
    appId: "1:116241143679:web:fc8d849bf7aeda9deeac4a"
  }


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase};