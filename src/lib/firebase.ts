
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA1upQpYN0dRtoterK2b60PRZu00idto7w",
  authDomain: "studio-7794488728-5e169.firebaseapp.com",
  projectId: "studio-7794488728-5e169",
  storageBucket: "studio-7794488728-5e169.appspot.com",
  messagingSenderId: "527192490995",
  appId: "1:527192490995:web:1876f1f0316c764ad04886",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
