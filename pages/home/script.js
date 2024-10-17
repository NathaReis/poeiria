const $box = document.querySelector("#cards");
let registers = [];

(() => {
    isLoading.true();
    sessionStorage.removeItem("poeiria");
    fetch('https://json-server-indol-five.vercel.app/poeiria')
    .then((res) => res.json())
    .then((data) => {
        registers = data.poeiria ? data.poeiria : data;
        poeiria(registers);
    })
})()

function poeiria(data) {
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
    isLoading.false();
}

const search = (element) => {
    const value = element.value;
    const regex = new RegExp(value, 'i');
    const vazio = /^\s*$/; 
    poeiria(vazio.test(value) ? registers : registers.filter((register) => regex.test(register.title)));
}
