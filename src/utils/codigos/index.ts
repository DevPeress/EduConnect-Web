function formatNumero(value: number | string) {
    const numero = Number(value);
    return numero.toLocaleString("pt-BR");
}

export { formatNumero }