 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
 import { getAuth , createUserWithEmailandPassword , signInWithEmailAndPassword , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 const firebaseConfig = {
   apiKey: "AIzaSyAksPFoZcupwgwSUZiM2Sxe_1UAuLInKFE",
   authDomain: "hackathon-blogging-app.firebaseapp.com",
   projectId: "hackathon-blogging-app",
   storageBucket: "hackathon-blogging-app.appspot.com",
   messagingSenderId: "606780240639",
   appId: "1:606780240639:web:7eaf6f3062bae71e6792ca",
   measurementId: "G-KPQE23FMWG"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const auth  = getAuth(app);

 export {auth, onAuthStateChanged}