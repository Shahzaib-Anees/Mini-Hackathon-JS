import { db, getDoc, doc } from "../../libs/firebase.js"
const blogCredential = localStorage.getItem("blogId");
const userId = localStorage.getItem("currentUser");
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

const appendBlogToDom = (blobDocs) => {
    const blogImage = document.getElementById("blog-image");
    const blogTitle = document.getElementById("blog-title");
    const blog_display_name = document.getElementById("blog-display-name");
    const blog_description = document.getElementById("blog-description");

    blogImage.src = `${blobDocs.image}`;
    blogTitle.innerText = `Tittle : ${blobDocs.title}`;
    blog_display_name.innerText = `Topic : ${blobDocs.displayName}`;
    blog_description.innerText = `Description : ${blobDocs.description}`;
}
const getUserData = async (userId) => {
    try {
        const docRef = doc(db, "siteUsers", `${userId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            changesDOM(docSnap.data());
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }

};
const getBlog = async (blogId) => {
    try {
        const docRef = doc(db, "blog-posts", `${blogId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            appendBlogToDom(docSnap.data());
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error);
    }
};



const loadDocs = () => {
    getUserData(userId);
    getBlog(blogCredential);
}


document.getElementById("body").addEventListener("load", loadDocs());