import validaSenha from "./valida-senha.js";
import formataNumero from "./formata-numero.js";

const formulario = document.querySelector("[data-formulario]");
const formularioInput = document.querySelectorAll("[required]");
const formularioTermo = document.querySelector("[data-termos]");

formularioInput.forEach(campo => {
    campo.addEventListener("focus", () => {
        campo.style.border = "2px solid var(--cor-escuro)";
        campo.style.color = "var(--cor-escuro)";
    })
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", (e) => {e.preventDefault()});
});
formularioTermo.addEventListener("invalid", (e) => {
    const descricao = document.querySelector(".termos_descricao");
    e.preventDefault();
    descricao.style.color = "var(--cor-erro)";
});
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = {
        "nome": event.target.elements["nome"].value,
        "email": event.target.elements["email"].value,
        "senha": event.target.elements["senha"].value,
        "numero": event.target.elements["numero"].value
    }
    localStorage.setItem("cadastro", JSON.stringify(inputs));
    window.location.href = "./formulario-imagens.html";
});

const mensagens = {
    nome: {
        valueMissing: "Insira um nome",
        tooShort: "Insira um nome válido"
    },
    email: {
        valueMissing: "Insira um email",
        typeMismatch: "Insira um email válido"
    },
    senha: {
        valueMissing: "Insira uma senha",
        tooShort: "Insira uma senha com no mínimo 8 caracteres",
        customError: "A senha deve conter uma letra maiúscula, uma minúscula e um número"
    },
    numero: {
        valueMissing: "Insira um numero",
        customError: "Este número é inválido"
    }
}
const tiposDeErro = [ "customError", "valueMissing", "tooShort", "typeMismatch"];

function verificaCampo(campo) {
    const mensagemErro = campo.parentNode.querySelector(".formulario_erro");
    campo.setCustomValidity("");
    mensagemErro.textContent = "";

    if (campo.name == "senha") {
        validaSenha(campo);
    }
    if (campo.name == "numero") {
        const numeroFormatado = formataNumero(campo);
        campo.value = numeroFormatado;
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagemErro.textContent = mensagens[campo.name][erro];
            campo.style.border = "2px solid var(--cor-erro)";
            campo.style.color = "var(--cor-erro)"
        }
    });
    console.log(campo.validity["valid"]);
}
