import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3SqTCReeuAdFqVPi8HAD7rEkAPuL-7M8",
  authDomain: "timerecording-7f949.firebaseapp.com",
  projectId: "timerecording-7f949",
  storageBucket: "timerecording-7f949.appspot.com",
  messagingSenderId: "519739811248",
  appId: "1:519739811248:web:e44c5e62078e095f752275",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
