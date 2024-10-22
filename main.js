const theme = (element) => {
    const html = document.querySelector("html");
    html.classList.toggle("light");
    const svgs = element.querySelectorAll("svg");
    svgs.forEach((svg) => {
        svg.classList.toggle("hidden");
    });
    element.classList.toggle("light");
    localStorage.setItem("theme", element.classList[0]);
}

(() => {
    const $theme = document.querySelector("#theme");
    if(localStorage.getItem("theme") === 'light') {
        theme($theme);
    }
})()

const createLoading = () => {
    const $html = document.querySelector("html");
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.classList.add("hidden");
    
    const loading = document.createElement("div");
    loading.classList.add("loader");
    loadingDiv.appendChild(loading);
    
    $html.appendChild(loadingDiv);
}

const isLoading = {
    true: () => {
        createLoading();
        const $loadingDiv = document.querySelector("#loading");
        $loadingDiv.classList.remove("hidden");
    },
    false: () => {
        const $loadingDiv = document.querySelector("#loading");
        $loadingDiv.classList.add("hidden");
    }
}