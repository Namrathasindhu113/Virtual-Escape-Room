
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    updateProfile
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export async function signUpWithEmail(email: string, password: string, displayName: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        return { user: userCredential.user };
    } catch (error) {
        console.error("Error signing up with email and password", error);
        throw error;
    }
}

export async function signInWithEmail(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user };
    } catch (error) {
        console.error("Error signing in with email and password", error);
        throw error;
    }
}

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return { user: result.user };
    } catch (error) {
        console.error("Error signing in with Google", error);
        throw error;
    }
}

export async function signOutUser() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
        throw error;
    }
}
