// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBByymXKFR7Qv-aWAvExgr50HBU1RAC35A",
  authDomain: "cadastro-e4faa.firebaseapp.com",
  projectId: "cadastro-e4faa",
  storageBucket: "cadastro-e4faa.firebasestorage.app",
  messagingSenderId: "541928206849",
  appId: "1:541928206849:web:6a55a8a60be8d9c9734600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, addDoc, collection };








