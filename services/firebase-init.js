import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { 
    getFirestore, 
    collection, 
    onSnapshot, 
    getDocs, 
    addDoc, 
    doc, 
    setDoc, 
    deleteDoc 
} 
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import { getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail 
} 
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhU1hvr1YWoOm6SJre_I4AbvfmpZxW92M",
    authDomain: "poeiria.firebaseapp.com",
    projectId: "poeiria",
    storageBucket: "poeiria.appspot.com",
    messagingSenderId: "525160371949",
    appId: "1:525160371949:web:e07339ab7713ef76f21ee4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);

export const fire = {
    app,
    db,
    auth,
    collection,
    onSnapshot,
    getDocs,
    addDoc,
    doc,
    setDoc,
    deleteDoc,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
}