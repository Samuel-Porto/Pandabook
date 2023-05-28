export default function formataNumero(campo) {
    const numero = campo.value;
    let numeroFormatado = numero.replace(/\D/g, "");
    if (numeroFormatado.length == 11) {
        numeroFormatado = numeroFormatado.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
        campo.setCustomValidity("Error");
    }
    return numeroFormatado;
}