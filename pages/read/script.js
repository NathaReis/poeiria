const $box = document.querySelector("main .box");
let poeiria;
(() => {
    poeiria = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiria) {
        $box.querySelector("h1").innerHTML = poeiria.title;
        $box.querySelector("p").innerHTML = poeiria.lines.join("<br><br>");
        $box.style = `--url: url(${poeiria.url})`;
    }
})()

function deleteData() {
    if(confirm("Deseja excluir Poeiria?")) {
        fetch(`https://json-server-indol-five.vercel.app/poeiria/${poeiria.id}`, {
            method: 'DELETE'
        })
        .then(() => window.location = "../home/")
        .catch((err) => {
            console.error(err);
            alert("Erro ao excluir Poeiria!");
        })
    }
}