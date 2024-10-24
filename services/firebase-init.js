import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, getDocs, addDoc, doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

export const fire = {
    db,
    collection,
    onSnapshot,
    getDocs,
    addDoc,
    doc,
    setDoc,
    deleteDoc
}