let poeiriaDados;
const $form = document.querySelector("form");
const $images = document.querySelector("main #images");
let urlImage = "";
const vazio = /^\s*$/; 

(() => {
    poeiriaDados = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiriaDados) {
        $form.author.value = poeiriaDados.author;
        $form.title.value = poeiriaDados.title;
        $form.text.value = poeiriaDados.lines.join("\n");
        poeiriaDados.search ? $form.search.value = poeiriaDados.search : null;
        poeiriaDados.url ? urlImage = poeiriaDados.url : null;
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

    if((vazio.test(urlImage) && vazio.test($form.search.value)) || (!vazio.test(urlImage) && !vazio.test($form.search.value))) {
        isLoading.true()
    
        const data = {
            author: $form.author.value,
            title: $form.title.value,
            lines: $form.text.value.split("\n")
        }
        const regexUrl = /^\s*$/;
        !regexUrl.test(urlImage) ? data['url'] = urlImage : null;
        !regexUrl.test($form.search.value) ? data['search'] = $form.search.value : !regexUrl.test(urlImage) ? urlImage : null;
    
        if(!poeiriaDados) {
            Poeiria.addDoc(data)
            .then(() => $form.reset())
            .catch(alert)
            .finally(() => isLoading.false());
        }
        else {
            Poeiria.setDoc(poeiriaDados.id, data)
            .then(() => {
                sessionStorage.setItem("poeiria", JSON.stringify({id: poeiriaDados.id,...data}));
                location = "../read/";
            })
            .catch(alert)
            .finally(() => isLoading.false());
        }
    }
    else {
        alert("Imagem não reconhecida!");
    }
})

function getImage({ value }) {
    $images.innerHTML = "";
    if(!vazio.test(value)) {
        fetch(`https://api.pexels.com/v1/search?query=${value}&per_page=100`, {
            headers: {
                Authorization: "Tjv2x3OIQnFfuvJtPWnXMmlZbfHKBPfoSvOwboq7Hckk5VwIptQY22gs"
            }
        })
        .then(res => res.json())
        .then(({ photos }) => {
            photos.forEach((photo) => {
                const img = document.createElement("img");
                img.src = photo.src.tiny;
                img.onclick = () => {
                    const $imgs = $images.querySelectorAll("img");
                    $imgs.forEach((i) => i.classList.remove("focus"));

                    if(urlImage === img.src) {
                        urlImage = "";
                    }
                    else {
                        urlImage = img.src;
                        img.classList.add("focus");
                    }
                }
                $images.appendChild(img);
            })
        })
        .catch(alert)
    }
    else {
        urlImage = "";
    }
}