let poeiriaDados;
const $form = document.querySelector("form");

(() => {
    poeiriaDados = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiriaDados) {
        $form.author.value = poeiriaDados.author;
        $form.title.value = poeiriaDados.title;
        $form.text.value = poeiriaDados.lines.join("\n");
        poeiriaDados.url ? $form.url.value = poeiriaDados.url : null;
        $form.submit.disabled = false;

        return document.querySelector("#add").remove();
    }
    document.querySelector("#edit").remove();
})()


$form.addEventListener("input", () => {
    $form.submit.disabled = $form.checkValidity() ? false : true;
})

$form.addEventListener("submit", (e) => {
    e.preventDefault();

    const poeiria = {
        author: $form.author.value,
        title: $form.title.value,
        lines: $form.text.value.split("\n")
    }
    const regexUrl = /^\s*$/;
    !regexUrl.test($form.url.value) ? poeiria['url'] = $form.url.value : null;

    if(!poeiriaDados) {
        fetch('https://json-server-indol-five.vercel.app/poeiria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poeiria)
        })
        .then(() => window.location = "../home/")
        .catch((err) => {
            console.error(err);
            alert("Erro ao criar Poeiria!");
        })
    }
    else {
        fetch(`https://json-server-indol-five.vercel.app/poeiria/${poeiriaDados.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poeiria)
        })
        .then(() => window.location = "../home/")
        .catch((err) => {
            console.error(err);
            alert("Erro ao editar Poeiria!");
        })
    }

})