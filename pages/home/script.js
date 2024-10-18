const $box = document.querySelector("#cards");
const $author = document.querySelector("#author");
let registers = [];

(() => {
    isLoading.true();
    sessionStorage.removeItem("poeiria");
    Poeiria.getAll().then((data) => {
        registers = data;
        poeiria(registers);
        author(registers);
    })
    .catch(alert)
    .finally(() => isLoading.false())
})()

function poeiria(data) {
    if(data) {
        $box.innerHTML = '';
    
        data.sort((a,b) => a.title > b.title ? 1 : -1 );
        data.map((poeiria) => {
            const card = document.createElement("div");
            card.classList.add("card");
            const img = document.createElement("div");
            img.classList.add("img");
            img.style = poeiria.url ? `--url: url(${poeiria.url})` : '--url: url(../../assets/book.webp)';
            const p = document.createElement("p");
            p.innerHTML = `<strong>${poeiria.title}</strong> ${poeiria.lines.join(", ")}`;
    
            card.onclick = () => {
                sessionStorage.setItem("poeiria", JSON.stringify(poeiria));
                window.location = "../read/";
            }
    
            card.appendChild(img);
            card.appendChild(p);
            $box.appendChild(card);
        });
    }
}

function author(data) {
    const authors = new Set([...data.map((d) => d.author)]);
    const $select = document.querySelector("#author");
    authors.forEach((author) => {
        const option = document.createElement("option");
        option.value = author;
        option.innerHTML = author;
        $select.appendChild(option);
    })
}

const search = (element) => {
    const value = element.value;
    const regex = new RegExp(value, 'i');
    const vazio = /^\s*$/; 

    const $author = document.querySelector("#author");
    const regexA = new RegExp($author.value, 'i');

    vazio.test($author.value) 
        ?poeiria(vazio.test(value) ? registers : registers.filter((register) => (regex.test(register.title) || regex.test(register.lines.join(" ")))))
        :poeiria(vazio.test(value) ? searchAuthor($author) : registers.filter((register) => 
            (regex.test(register.title) || regex.test(register.lines.join(" "))) && regexA.test(register.author)));
}

const searchAuthor = (element) => {
    const value = element.value;
    const regex = new RegExp(value, 'i');
    const vazio = /^\s*$/; 

    
    const $search = document.querySelector("#search");
    const regexS = new RegExp($search.value, 'i');
    
    vazio.test($search.value) 
        ?poeiria(vazio.test(value) ? registers : registers.filter((register) => regex.test(register.author)))
        :poeiria(vazio.test(value) ? search($search) : registers.filter((register) => 
            (regexS.test(register.title) || regexS.test(register.lines.join(" "))) && regex.test(register.author)));
}
