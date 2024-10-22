const consult = () => {
    fetch("https://script.google.com/macros/s/AKfycbz-YUAKRAVVZFfY98eBlBp6E9ftZeZyjAaA7QPPHzaO95XOm7vbVvomp9mrtHWI4NFb/exec")
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    })
}
consult()