import { onAuthStateChanged } from "../../libs/firebase";


document.body.addEventListener("load" , ()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log(`logged In ==> ${uid}`);
          
        } else {
          location.replace("./assests/Pages/Auth/Auth_Log/sign_in.html");
        }
      });
})