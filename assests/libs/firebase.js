import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAksPFoZcupwgwSUZiM2Sxe_1UAuLInKFE",
  authDomain: "hackathon-blogging-app.firebaseapp.com",
  projectId: "hackathon-blogging-app",
  storageBucket: "hackathon-blogging-app.appspot.com",
  messagingSenderId: "606780240639",
  appId: "1:606780240639:web:1352fc7194150cb46792ca",
  measurementId: "G-2TXRXRXHLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth, onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  doc,
  setDoc
}