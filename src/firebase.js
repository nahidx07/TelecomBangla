import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "আপনার_API_KEY",
  authDomain: "আপনার_DOMAIN",
  projectId: "আপনার_PROJECT_ID",
  storageBucket: "আপনার_BUCKET",
  messagingSenderId: "আপনার_ID",
  appId: "আপনার_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
