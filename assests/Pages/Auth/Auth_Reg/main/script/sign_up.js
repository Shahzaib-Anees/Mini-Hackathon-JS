import { auth, createUserWithEmailAndPassword, onAuthStateChanged, db, doc, setDoc } from "../../../../../libs/firebase.js";

import { loader } from "../../../../../common/script/loaders.js";


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        localStorage.setItem("currentUser", `${uid}`)
        console.log(`logged In ==> ${uid}`);
        location.replace("../../../../index.html");
    } else {
        console.log("User is signed out");
        localStorage.removeItem("currentUser");
    }
});

const signUPForm = document.getElementById("sign-up-form");

const creatUserinDataBase = async (newUid, name, email, password) => {
    try {
        const userDoc = await setDoc(doc(db, "siteUsers", newUid), {
            name: name,
            email: email,
            password: password,
        });

        console.log(userDoc);
        console.log(`New User in DataBase with uid : ${newUid}`);

    } catch (error) {
        console.log(error);
    }

}

signUPForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);

    const userName = e.srcElement[0].value;
    const userEmail = e.srcElement[1].value;
    const userPassword = e.srcElement[2].value;

    const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword)
    try {
        loader("Registered Successfully");
        const user = userCredential.user;
        creatUserinDataBase(user.uid, userName, userEmail, userPassword);
        console.log(user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    } finally {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
    }
})