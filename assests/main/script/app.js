import { db, getDoc, doc, getDocs, collection } from "../../libs/firebase.js";

const currentUser = localStorage.getItem("currentUser");
const getBlogDataFromServer = async () => {
  const querySnapshot = await getDocs(collection(db, "blog-posts"));
  try {
    const blogsMainContainer = document.getElementById("blogs-main-container")
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      if (doc.exists()) {
        console.log("Document data:", doc.data());
        const blogImage = doc.data().image;
        const blogTitle = doc.data().title;
        const blogDescription = doc.data().description;
        const blogDisplayName = doc.data().displayName;
        let blogContainer = `
     <div class="blog-container">
        <div class="blog-image">
            <img src="${blogImage}" alt="blog-image">
        </div>
        <div class="blog-content">
            <h1 class="title">
                ${blogTitle}
            </h1>
            <p class="blog-description">
              ${blogDescription.length > 30 ? blogDescription.substring(0, 50) + "..." : blogDescription}
            </p>
          <button onclick="getSingleProduct(this,'${doc.id}')" class="read-more-btn">
             Read More
          </button>
       </div>
          <p class="blog-display-name">
              Topic : ${blogDisplayName}
            </p>`
        blogsMainContainer.innerHTML += blogContainer;
      } else {
        console.log("No such Document");

      }
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  } finally {

  }
}

const changesDOM = (userDoc) => {
  const rowNavSignInLink = document.getElementById("row-nav-sign-in-link");
  const rowNavProfileToggler = document.getElementById("row-nav-profile-toggler");
  const userName = document.getElementById("user-name");
  userName.innerText = `${userDoc.name}`;
  const userImage = document.querySelectorAll(".user-profile-image");
  userImage.forEach((image) => {
    image.src = `${userDoc.imgUrl}`;
  });
  rowNavSignInLink.style.display = "none";
  rowNavProfileToggler.style.display = "flex";
}

const getCurrentUserData = async (currentUserUid) => {
  try {
    const docRef = doc(db, "siteUsers", `${currentUserUid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      changesDOM(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};


const loadDocs = () => {
  if (localStorage.getItem("currentUser") !== null) {
    getCurrentUserData(currentUser);
    getBlogDataFromServer();
  } else {
    window.location.href = "./assests/Pages/Auth/Auth_Log/sign_in.html";
  }
}



document.getElementById("body").addEventListener("load", loadDocs())