// src/app/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnXN_J-yMZdMwG6cL_MngoTK9WKt-htQs",
  authDomain: "farmagro-cb0aa.firebaseapp.com",
  projectId: "farmagro-cb0aa",
  storageBucket: "farmagro-cb0aa.appspot.com",
  messagingSenderId: "994103915919",
  appId: "1:994103915919:web:9f4b51b5ec7128ece887fa",
  measurementId: "G-C27RN5JXR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db ,storage};
