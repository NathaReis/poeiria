let url = 'https://json-server-indol-five.vercel.app/poeiria/';
const $form = document.querySelector("form");
$form.addEventListener("input", () => {
    $form.submit.disabled = $form.checkValidity() ? false : true;
})

$form.addEventListener("submit", (e) => {
    e.preventDefault();

    const poeiria = {
        title: $form.title.value,
        lines: $form.text.value.split("\n")
    }
    const regexUrl = /^\s*$/;
    !regexUrl.test($form.url.value) ? poeiria['url'] = $form.url.value : null;

    fetch(url, {
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
})

const $box = document.querySelector("main .box");

(() => {
    const poeiria = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiria) {
        $form.title.value = poeiria.title;
        $form.text.value = poeiria.lines.join("\n");
        poeiria.url ? $form.url.value = poeiria.url : null;
        $form.submit.disabled = false;
        url += poeiria.id;
    }
})()