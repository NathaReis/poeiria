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
})