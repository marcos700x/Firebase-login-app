// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCngVT883_7Y-qh3cgHKEKaFwUN_Cc3RCY",
  authDomain: "fir-test-7863f.firebaseapp.com",
  projectId: "fir-test-7863f",
  storageBucket: "fir-test-7863f.appspot.com",
  messagingSenderId: "591849498402",
  appId: "1:591849498402:web:a2eb95a716864d65d2277b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
