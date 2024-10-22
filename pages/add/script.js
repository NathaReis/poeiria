let poeiriaDados;
const $form = document.querySelector("form");
const $search = document.querySelector("#search");
const $images = document.querySelector("main #images");
const vazio = /^\s*$/; 
let urlImage = "";
let currentMedia;

(() => {
    poeiriaDados = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiriaDados) {
        $form.author.value = poeiriaDados.author;
        $form.title.value = poeiriaDados.title;
        $form.text.value = poeiriaDados.lines.join("\n");
        poeiriaDados.search ? $search.value = poeiriaDados.search : null;
        poeiriaDados.url ? urlImage = poeiriaDados.url : null;
        $form.submit.disabled = false;
        $images.querySelector("img").src = urlImage;

        return document.querySelector("#add").remove();
    }
    document.querySelector("#edit").remove();
})()

const reset = () => {
    $search.value = "";
    urlImage = "";
    $images.innerHTML = "";
    document.querySelector(".current h6").innerHTML = "";
    document.querySelector(".max h6").innerHTML = "";
    $form.reset();
}

$form.addEventListener("input", () => {
    $form.submit.disabled = $form.checkValidity() ? false : true;
})

$form.addEventListener("submit", (e) => {
    e.preventDefault();

    if((vazio.test(urlImage) && vazio.test($search.value)) || (!vazio.test(urlImage) && !vazio.test($search.value))) {
        isLoading.true()
    
        const data = {
            author: $form.author.value,
            title: $form.title.value,
            lines: $form.text.value.split("\n")
        }
        const regexUrl = /^\s*$/;
        !regexUrl.test(urlImage) ? data['url'] = urlImage : null;
        !regexUrl.test($search.value) ? data['search'] = $search.value : !regexUrl.test(urlImage) ? urlImage : null;
    
        if(!poeiriaDados) {
            Poeiria.addDoc(data)
            .then(reset)
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

function getImage(page=1) {
    if(!vazio.test($search.value)) {
        fetch(`https://api.pexels.com/v1/search/?locale=pt-BR&page=${page}&per_page=15&query=${$search.value}`, {
            headers: {
                Authorization: "Tjv2x3OIQnFfuvJtPWnXMmlZbfHKBPfoSvOwboq7Hckk5VwIptQY22gs"
            }
        })
        .then(res => res.json())
        .then((media) => {
            $images.innerHTML = "";
            currentMedia = media;
            
            document.querySelector(".current h6").innerHTML = media.page;
            document.querySelector(".max h6").innerHTML = Math.ceil(media.total_results / media.per_page);

            media.photos.forEach((photo) => {
                const img = document.createElement("img");
                img.src = photo.src.large;
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
        reset();
    }
}

function formToggle(image) {
    const $imageBox = document.querySelector("#images-box");
    if(image) {
        $imageBox.classList.add("active");
        $form.classList.add("desactive");
    }
    else {
        $form.classList.remove("desactive");
        $imageBox.classList.remove("active");
    }
}

function page(next) {
    if(currentMedia) {
        if(next) {
            if(currentMedia.page != Math.ceil(currentMedia.total_results / currentMedia.per_page)) {
                getImage(++currentMedia.page);
            }
            else {
                getImage();
            }
        }
        else {
            if(currentMedia.page != 1) {
                getImage(--currentMedia.page);
            }
            else {
                getImage(Math.ceil(currentMedia.total_results / currentMedia.per_page));
            }
        }
    }
}