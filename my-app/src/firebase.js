// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_API_KEY,
  authDomain: "expertconnect-8f8ff.firebaseapp.com",
  projectId: "expertconnect-8f8ff",
  storageBucket: "expertconnect-8f8ff.appspot.com",
  messagingSenderId: "145903379348",
  appId: "1:145903379348:web:0e7a9cae03142f56cce581",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
