const $html = document.querySelector("html");

(() => {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.classList.add("hidden");
    
    const loading = document.createElement("div");
    loading.classList.add("loader");
    loadingDiv.appendChild(loading);
    
    $html.appendChild(loadingDiv);
})()

const isLoading = {
    true: () => {
        const $loadingDiv = document.querySelector("#loading");
        $loadingDiv.classList.remove("hidden");
    },
    false: () => {
        const $loadingDiv = document.querySelector("#loading");
        setTimeout(() => {
            $loadingDiv.classList.add("hidden");
        }, 1200);
    }
}