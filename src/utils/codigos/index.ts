function formatBRL(value: number | string) {
    const numero = Number(value);
    return numero.toLocaleString("pt-BR");
}

function formatCPF(value: string) {
  const v = value.replace(/\D/g, "").slice(0, 11); // só números, máximo 11 dígitos

  if (v.length <= 3) return v;
  if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
  if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
  return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9, 11)}`;
}

function formatTelefone(value: string) {
  const v = value.replace(/\D/g, "").slice(0, 11); // só números, máximo 11 dígitos

  if (v.length <= 2) return `(${v}`;
  if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
  return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
}

export { formatBRL, formatCPF, formatTelefone }