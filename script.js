const $box = document.querySelector("#cards");

(() => {
    sessionStorage.removeItem("poeiria");
    fetch('./db.json')
    .then((res) => res.json())
    .then((data) => {
        poeiria(data.poeiria);
    })
})()

function poeiria(data) {
    data.sort((a,b) => a.title > b.title ? 1 : -1 );
    data.map((poeiria) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("div");
        img.classList.add("img");
        img.style = poeiria.url ? `--url: url(${poeiria.url})` : '--url: url(./assets/por-do-sol.jpg)';
        const p = document.createElement("p");
        p.innerHTML = `<strong>${poeiria.title}</strong> ${poeiria.lines.join(", ")}`;

        p.onclick = () => {
            sessionStorage.setItem("poeiria", JSON.stringify(poeiria));
            location = "./read/";
        }

        card.appendChild(img);
        card.appendChild(p);
        $box.appendChild(card);
    });
}
