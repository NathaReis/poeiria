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
    
    const loading = document.createElement("div");
    loading.classList.add("loader");
    loadingDiv.appendChild(loading);
    
    $html.appendChild(loadingDiv);
}

const isLoading = {
    true: () => {
        createLoading();
    },
    false: () => {
        const $loadingDiv = document.querySelector("#loading");
        $loadingDiv.remove();
    }
}

async function logout() {
    try {
        isLoading.true();
        await Poeiria.logout();
        isLoading.false();
    }
    catch (error) {
        alert(error);
    }
}

// Style Header
const $header = document.querySelector("header");
let prevScrollpos = window.pageYOffset;

window.onscroll = () => {
    const currentScrollPos = window.pageYOffset;
    if(prevScrollpos > currentScrollPos) {
        $header.classList.remove("header-scroll");
    }
    else {
        $header.classList.add("header-scroll");
    };
    prevScrollpos = currentScrollPos;
}