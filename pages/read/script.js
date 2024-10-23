const $box = document.querySelector("main .box");
let poeiria;
(() => {
    poeiria = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiria) {
        $box.querySelector("h1").innerHTML = poeiria.title;
        $box.querySelector("p").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-quote" viewBox="0 0 16 16"><path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"/></svg>` 
            + poeiria.lines.join("<br><br>") + ' "<br>' + `<span>${poeiria.author}<span>`;
        $box.style = `--url: url(${poeiria.url})`;
    }
})()

function deleteData() {
    if(confirm("Deseja excluir Poeiria?")) {
        isLoading.true();
        Poeiria.deleteDoc(poeiria.id) 
        .then(() => location = "../home/")
        .catch(alert)
        .finally(() => isLoading.false());
    }
}