// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCiRNPmPnfy6VNFOgJ9kVrQwRgvibegv10",
    authDomain: "hackhazard-2489c.firebaseapp.com",
    projectId: "hackhazard-2489c",
    storageBucket: "hackhazard-2489c.firebasestorage.app",
    messagingSenderId: "713010182456",
    appId: "1:713010182456:web:1bdb3262688e45773e29cd"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication
const db = getFirestore(app); // Firestore Database

export { auth, db };
