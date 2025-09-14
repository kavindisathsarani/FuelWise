import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL7ipuROuEqpKIanlsEDumNeqP470RQlc",
  authDomain: "task-manager-5cb56.firebaseapp.com",
  projectId: "task-manager-5cb56",
  storageBucket: "task-manager-5cb56.firebasestorage.app",
  messagingSenderId: "309075601412",
  appId: "1:309075601412:web:9f113530572ce5ff25ed51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);