const form = document.querySelector("[data-form]");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const email = document.querySelector("[data-email]").value;
    const password = document.querySelector("[data-password]").value;

    if (email.length > 15 && password.length > 6) {
        window.location.href = "../views/produto.html";
    } else {
        alert("Insira email e senha corretos, por favor.");
    }
});