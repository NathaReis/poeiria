const $box = document.querySelector("main .box");

(() => {
    const poeiria = JSON.parse(sessionStorage.getItem("poeiria"));
    if(poeiria) {
        $box.querySelector("h1").innerHTML = poeiria.title;
        $box.querySelector("p").innerHTML = poeiria.lines.join("<br>");
    }
})()