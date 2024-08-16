const anchorCollapseMouseEnter = (element) => {
    const parentAnchor = element.childNodes[1]
    const anchorCollapsePara = element.childNodes[1].childNodes[3]

    parentAnchor.classList.remove("col-nav-parent-anchor-default");
    parentAnchor.classList.add("col-nav-para-collapse");
    anchorCollapsePara.style.display = "flex"
}

const anchorCollapseMouseLeave = (element) => {
    const parentAnchor = element.childNodes[1]
    const anchorCollapsePara = element.childNodes[1].childNodes[3]

    parentAnchor.classList.add("col-nav-parent-anchor-default");
    parentAnchor.classList.remove("col-nav-para-collapse");
    anchorCollapsePara.style.display = "none"

}

const getSingleProduct = (btn, blogId)=>{
    console.log(btn);
    localStorage.setItem("blogId", blogId);
    window.location.replace("./assests/single_blog/blog.html");
  }
  