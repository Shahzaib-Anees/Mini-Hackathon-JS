import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../../../../../libs/firebase.js";

import { loader } from "../../../../../common/script/loaders.js";
const signInForm = document.getElementById("sign-in-form");

onAuthStateChanged(auth, (user) => {
    if (user) {
        loader("Already Logged In");
        const uid = user.uid;
        localStorage.setItem("currentUser", `${uid}`)
        console.log(`logged In ==> ${uid}`);
        setTimeout(() => {
            location.replace("../../../../index.html");
        },200)
    } else {
        console.log("User is signed out");
        localStorage.removeItem("currentUser");
    }
});
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);
    const userEmail = e.srcElement[0].value;
    const userPassword = e.srcElement[1].value;
    const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword)
    try {
        loader("Logged In Successfully");
        const user = userCredential.user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    } finally {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
    }
})