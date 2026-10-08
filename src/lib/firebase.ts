import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKOL05gBa5JQCM8uzmTQwg5kxTGolZalI",
  authDomain: "dfih-e689b.firebaseapp.com",
  projectId: "dfih-e689b",
  storageBucket: "dfih-e689b.firebasestorage.app",
  messagingSenderId: "607834990466",
  appId: "1:607834990466:web:daac00f4b73dc7972c919b",
  measurementId: "G-6B1K3GWWP7"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
