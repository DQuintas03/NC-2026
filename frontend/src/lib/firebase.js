import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDootisU_vo6h8G1EMbdstKVAGOlIPjA30",
  authDomain: "nc-tub.firebaseapp.com",
  projectId: "nc-tub",
  storageBucket: "nc-tub.firebasestorage.app",
  messagingSenderId: "295850499728",
  appId: "1:295850499728:web:2dfb9c2759dc21dcd4215",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
