// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2XaKLABXMzr-Vx3IKfIxfjpeDQUcvS54",
  authDomain: "api-flash-card.firebaseapp.com",
  projectId: "api-flash-card",
  storageBucket: "api-flash-card.appspot.com",
  messagingSenderId: "827989799157",
  appId: "1:827989799157:web:dbb961d34b1c622324d5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
