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
        location = "../home/index.html";
    }
    catch (error) {
        alert(error);
    }
    finally{isLoading.false()}
}

const registration = async () => {
    try {
        if($form.checkValidity()) {
            if(confirm(`Deseja criar o usuário: ${$form.email.value}?`)) {
                isLoading.true();
                await Poeiria.createUser($form.email.value, $form.password.value);
                location = "../home/index.html";
            }
        }
        else {
            alert("Preencha os dados corretamente!");
        }
    }
    catch (error) {
        alert(error);
    }
    finally{isLoading.false()}
}

const vazio = /^\s*$/; 
const recoverPassword = async () => {
    try {
        if(!vazio.test($form.email.value)) {
                isLoading.true();
                await Poeiria.recoverPassword($form.email.value);
                alert("Confira seu email para criar a nova senha");
        }
        else {
            alert("Preencha o email corretamente!");
        }
    }
    catch (error) {
        alert(error);
    }
    finally{isLoading.false()}
}