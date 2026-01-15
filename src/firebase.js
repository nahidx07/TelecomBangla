import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbYJQ9y9CJKiT5aJyrIA0pFRGy1uvZikA",
  authDomain: "telicombangla-1.firebaseapp.com",
  projectId: "telicombangla-1",
  storageBucket: "telicombangla-1.firebasestorage.app",
  messagingSenderId: "1020351520674",
  appId: "1:1020351520674:web:c84659bc5ca2f6b41edcfb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
