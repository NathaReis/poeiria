const $ball = document.querySelector("#ball");

document.addEventListener("mousemove", (event) => {
    requestAnimationFrame(() => {
        renderBall(event.clientX, event.clientY);
    });
});
document.addEventListener("touchmove", (event) => {
    requestAnimationFrame(() => {
        renderBall(event.touches[0].clientX, event.touches[0].clientY);
    });
});

function renderBall(x, y) {
    const ballStyle = getComputedStyle($ball);
    const size = parseInt(ballStyle.width, 10);

    x -= size / 2;
    y -= size / 2;
    
    // Verificando se a bola está dentro dos limites da janela
    x = Math.max(0, Math.min(window.innerWidth - size, x));
    y = Math.max(0, Math.min(window.innerHeight - size - 70, y));

    $ball.style.left = `${x}px`;
    $ball.style.top = `${y}px`;
}