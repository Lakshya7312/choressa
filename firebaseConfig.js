// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmqn_PynFPQLQ3lL8pTg9MLTwLoSN9B5Q",
  authDomain: "choressa-9cc82.firebaseapp.com",
  projectId: "choressa-9cc82",
  storageBucket: "choressa-9cc82.appspot.com",
  messagingSenderId: "391920056233",
  appId: "1:391920056233:web:686bac82fc26b4465636b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
