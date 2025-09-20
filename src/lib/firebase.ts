// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// This is a public configuration and is safe to be exposed.
const firebaseConfig = {
  apiKey: "AIzaSyA1upQpYN0dRtoterK2b60PRZu00idto7w",
  authDomain: "studio-7794488728-5e169.firebaseapp.com",
  projectId: "studio-7794488728-5e169",
  storageBucket: "studio-7794488728-5e169.appspot.com",
  messagingSenderId: "527192490995",
  appId: "1:527192490995:web:1876f1f0316c764ad04886",
};

// Initialize Firebase for Singleton Pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };
