
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuehBkaPES_UHO9SJ-ag43AyejWNVudoA",
  authDomain: "addhope-golfday.firebaseapp.com",
  projectId: "addhope-golfday",
  storageBucket: "addhope-golfday.appspot.com",
  messagingSenderId: "632881170544",
  appId: "1:632881170544:web:943fc5502e251eb0640cb5",
  measurementId: "G-SQ2CMM306T"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
