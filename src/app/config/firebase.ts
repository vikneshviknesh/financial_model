// initialize firebase
import { initializeApp } from "firebase/app";

// firebase auth service
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// firebase DB service
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// initialize firebase
export const app = initializeApp(firebaseConfig);

// connect to firebase auth with your credentials
export const auth = getAuth(app);

// connect to firebase db with your credentials
export const db = getFirestore(app);
