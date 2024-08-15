const loader = (loadState) => {
    const loader = document.getElementById("loader");
    const loaderIcn = document.getElementById("loader-icon");
    const loaderText = document.getElementById("loader-dynamic-text");
    loaderText.innerText = loadState;
    loaderIcn.classList.add("rotate");
    loader.style.display = "flex";

}

export { loader };      