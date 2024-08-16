const getSingleProduct = (btn, blogId)=>{
    console.log(btn);
    localStorage.setItem("blogId", blogId);
    window.location.replace("./assests/single_blog/blog.html");
  }
  