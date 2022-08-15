// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_FIREBASE,

  authDomain: process.env.REACT_APP_AUTH_DOM_FIREBASE,

  projectId: process.env.REACT_APP_PROJECTID_FIREBASE,

  storageBucket: process.env.REACT_APP_STORAGE_FIREBASE,

  messagingSenderId: process.env.REACT_APP_MSG,

  appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Database
export const db = getFirestore(app);

export default app;
