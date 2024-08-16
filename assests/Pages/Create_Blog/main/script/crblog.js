import { doc, db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from "../../../../libs/firebase.js";


const crBlogPostForm = document.getElementById("blog-form");

const currentUser = localStorage.getItem("currenUser");

const addBlogtoDataBase = async (blogTitle, blogDisplayName, blogDescription, blogImageUrl) => {
    try {
        const docRef = await addDoc(collection(db, "blog-posts"), {
            title: blogTitle,
            displayName: blogDisplayName,
            description: blogDescription,
            image: blogImageUrl,
            createdBy: {
                createrUid: currentUser
            }
        });
        console.log("Document written with ID: ", docRef.id);

    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
crBlogPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(e);
    const blogTitle = e.srcElement[0].value;
    const blogDisplayName = e.srcElement[1].value;
    const blogDescription = e.srcElement[2].value;
    const blogImage = e.srcElement[3].files[0];
    const loader = document.getElementById("pre-loader");
    try {
        loader.style.display = "flex";
        const storageRef = ref(storage, `blogs-images/${blogImage.name}`);
        // 'file' comes from the Blob or File API
        const snapshot = await uploadBytes(storageRef, blogImage);
        console.log('Uploaded a blob or file!');
        console.log(snapshot);
        const url = await getDownloadURL(storageRef);
        try {
            console.log(url);
            await addBlogtoDataBase(blogTitle, blogDisplayName, blogDescription, url);;
        } catch {
            (error) => {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        loader.style.display = "none";
        location.replace("../../../index.html")
    }

})