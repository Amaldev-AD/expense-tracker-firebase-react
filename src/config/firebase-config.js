// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgVe618-1_ppkQWJK-jEdTZkFePEs4mw4",
  authDomain: "expense-tracker-2117f.firebaseapp.com",
  projectId: "expense-tracker-2117f",
  storageBucket: "expense-tracker-2117f.appspot.com",
  messagingSenderId: "380847029241",
  appId: "1:380847029241:web:6c25c5c46752c9c9cbdb28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider =new GoogleAuthProvider()
export const db = getFirestore(app)

// firebase login
// firebase init
// firebase deploy