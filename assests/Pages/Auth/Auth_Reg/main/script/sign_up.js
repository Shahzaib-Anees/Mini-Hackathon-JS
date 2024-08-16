import { auth, createUserWithEmailAndPassword, onAuthStateChanged, db, doc, setDoc } from "../../../../../libs/firebase.js";

import { loader } from "../../../../../common/script/loaders.js";


onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        localStorage.setItem("currentUser", `${uid}`)
        console.log(`logged In ==> ${uid}`);
    } else {
        console.log("User is signed out");
        localStorage.removeItem("currentUser");
    }
});

const signUPForm = document.getElementById("sign-up-form");

const creatUserinDataBase = async (uid, name, email, password, imgUrl = "https://firebasestorage.googleapis.com/v0/b/hackathon-blogging-app.appspot.com/o/users-images%2Fuser-removebg-preview.png?alt=media&token=ff45c6cb-6ad2-4652-889a-0de8ef51d530") => {
    try {
        const userDoc = await setDoc(doc(db, "siteUsers", uid), {
            name: name,
            email: email,
            password: password,
            imgUrl: imgUrl,
        });

        console.log(userDoc);
        console.log(`New User in DataBase with uid : ${uid}`);

    } catch (error) {
        console.log(error);
    }finally{
        location.replace("../../../../index.html");
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
        creatUserinDataBase(`${user.uid}`, userName, userEmail, userPassword);
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