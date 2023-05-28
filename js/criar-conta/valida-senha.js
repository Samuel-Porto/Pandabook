export default function validaSenha(campo) {
    const senha = campo.value;
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha) && /[0-9]/.test(senha)) {
        return;
    } else {
        campo.setCustomValidity("Error");
    }
}