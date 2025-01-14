
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7GZByIiXkUVSzfHmyc0EKqN0YNERXiEQ",
  authDomain: "simple-firebase-38852.firebaseapp.com",
  projectId: "simple-firebase-38852",
  storageBucket: "simple-firebase-38852.firebasestorage.app",
  messagingSenderId: "639855195174",
  appId: "1:639855195174:web:cecb26d4c0322a644962e7",
  measurementId: "G-KD0W7FC0WX"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);