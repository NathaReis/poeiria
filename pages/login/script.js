const $eyes = document.querySelectorAll("#password-box svg");
const $password = document.querySelector("#password-box input");
$eyes.forEach((eye) => {
    eye.onclick = () => {
        $eyes.forEach((e) => e.classList.toggle("hidden"));
        $password.type = $password.type === 'password' ? 'text' : 'password';
    }
})

const $form = document.querySelector("form");
$form.oninput = () => {
    $form.submit.disabled = !$form.checkValidity() && $form.password.value.length > 6;
}

$form.onsubmit = async (e) => {
    try {
        isLoading.true();
        e.preventDefault();
        await Poeiria.login($form.email.value, $form.password.value);
        location = "../home/";
    }
    catch (error) {
        alert(error);
    }
    finally{isLoading.false()}
}