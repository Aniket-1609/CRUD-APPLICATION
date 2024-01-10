// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCCRaKZA2CUO4JYsvg3A_3DcUQnLQpDESE",
  authDomain: "task-manager-cfaf6.firebaseapp.com",
  projectId: "task-manager-cfaf6",
  storageBucket: "task-manager-cfaf6.appspot.com",
  messagingSenderId: "92912440795",
  appId: "1:92912440795:web:6254e984579a3bf8b343fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)