let poeiriaDados;
const $form = document.querySelector("form");
const $search = document.querySelector("#search");
const $images = document.querySelector("main #images");
const vazio = /^\s*$/; 
let urlImage = "";
let currentMedia = {};

(async () => {
    try {
        isLoading.true();
        poeiriaDados = await Poeiria.getDoc();// JSON.parse(sessionStorage.getItem("poeiria"));
    
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
    }
    catch (error) {
        console.error(error);
        document.querySelector("#edit").remove();
    }
    finally{isLoading.false()}
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

$form.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();
        isLoading.true();
        const uid = await Poeiria.getMyUID();
    
        if(uid) {
            if((vazio.test(urlImage) && vazio.test($search.value)) || (!vazio.test(urlImage) && !vazio.test($search.value))) {
            
                const data = {
                    updatedAt: (new Date()).toDateString(),
                    author: $form.author.value,
                    title: $form.title.value,
                    lines: $form.text.value.split("\n")
                }
                const regexUrl = /^\s*$/;
                !regexUrl.test(urlImage) ? data['url'] = urlImage : null;
                !regexUrl.test($search.value) ? data['search'] = $search.value : !regexUrl.test(urlImage) ? urlImage : null;
            
                
                if(!poeiriaDados) {
                    data['createdBy'] = uid;
                    data['createdAt'] = (new Date()).toDateString();
                    await Poeiria.addDoc(data);
                    reset();
                }
                else {
                    await Poeiria.setDoc(data);
                    const docId = new URLSearchParams(location.search).get('doc');
                    location = `../read/index.html?doc=${docId}`;
                }
            }
            else {
                alert("Imagem não reconhecida!");
            }
        }
        else {
            alert("Usuário não possui permissões necessárias!");
        }
    }
    catch (error) {
        console.error(error);
        alert("Erro registrar o arquivo!");
    }
    finally{isLoading.false()}
})

async function getImage(page=1) {
    try {
        if(!vazio.test($search.value)) {
            const result = await fetch(`https://api.pexels.com/v1/search/?locale=pt-BR&page=${page}&per_page=15&query=${$search.value}`, {
                headers: {
                    Authorization: "Tjv2x3OIQnFfuvJtPWnXMmlZbfHKBPfoSvOwboq7Hckk5VwIptQY22gs"
                }
            })
            const media = await result.json();

            const numPages = Math.ceil(media.total_results / media.per_page);
            const prevPage = page === 1 ? numPages : page - 1;
            const nextPage = page === numPages ? 1 : page + 1;
            
            const promises = [
                fetch(`https://api.pexels.com/v1/search/?locale=pt-BR&page=${prevPage}&per_page=15&query=${$search.value}`, {
                    headers: {
                        Authorization: "Tjv2x3OIQnFfuvJtPWnXMmlZbfHKBPfoSvOwboq7Hckk5VwIptQY22gs"
                    }
                }),
                fetch(`https://api.pexels.com/v1/search/?locale=pt-BR&page=${nextPage}&per_page=15&query=${$search.value}`, {
                    headers: {
                        Authorization: "Tjv2x3OIQnFfuvJtPWnXMmlZbfHKBPfoSvOwboq7Hckk5VwIptQY22gs"
                    }
                })
            ];
            const [resultPrev, resultNext] = await Promise.all(promises);
            
            currentMedia['media'] = media;
            currentMedia['prevMedia'] = await resultPrev.json();
            currentMedia['nextMedia'] = await resultNext.json();
            currentMedia['numPages'] = numPages;
            page === 1 ? renderImage() : null;
        }
        else {
            reset();
        }
    }
    catch (error) {
        alert(error);
    }
}

function renderImage(page='media') {
    $images.innerHTML = "";
    
    document.querySelector(".current h6").innerHTML = currentMedia[page].page;
    document.querySelector(".max h6").innerHTML = currentMedia['numPages'];
    
    currentMedia[page].photos.forEach((photo) => {
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
        
    page !== 'media' ? setCurrentImage(page) : null;
}

function setCurrentImage(page) {
    getImage(currentMedia[page].page)
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
        next
            ?renderImage('nextMedia')
            :renderImage('prevMedia');
    }
}

function locationDoc() {
    const docId = new URLSearchParams(location.search).get('doc');
    location = docId ? `../read/index.html?doc=${docId}` : "../home/";
}