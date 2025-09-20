
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1upQpYN0dRtoterK2b60PRZu00idto7w",
  authDomain: "studio-7794488728-5e169.firebaseapp.com",
  projectId: "studio-7794488728-5e169",
  storageBucket: "studio-7794488728-5e169.appspot.com",
  messagingSenderId: "527192490995",
  appId: "1:527192490995:web:1876f1f0316c764ad04886",
  measurementId: ""
};

// Initialize Firebase for Singleton Pattern
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);


export { app, db, auth };
