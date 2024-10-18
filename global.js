const createLoading = () => {
    const $html = document.querySelector("html");
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.classList.add("hidden");
    
    const loading = document.createElement("div");
    loading.classList.add("loader");
    loadingDiv.appendChild(loading);
    
    $html.appendChild(loadingDiv);
    return loadingDiv;
}

const isLoading = {
    true: () => {
        const $loadingDiv = document.querySelector("#loading") ? document.querySelector("#loading") : createLoading();
        $loadingDiv.classList.remove("hidden");
    },
    false: () => {
        const $loadingDiv = document.querySelector("#loading");
        $loadingDiv.classList.add("hidden");
    }
}