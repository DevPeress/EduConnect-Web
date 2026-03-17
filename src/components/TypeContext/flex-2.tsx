import { useEffect, useState } from "react";
import type { CadastroAlunoInput } from "../../schemas/Cadastro/CadastroAlunoSchema";
import type { CadastroPagamentoInput } from "../../schemas/Cadastro/CadastroPagementoSchema";
import type { CadastroProfessorInput } from "../../schemas/Cadastro/CadastroProfessorSchema";
import type { CadastroTurmaInput } from "../../schemas/Cadastro/CadastroTurmaSchema";
import type { FlexContext } from "../../types/types";
import { http } from "../../utils/axios";
import {
  formatCPF,
  formatTelefone,
  IdentificarTipo,
} from "../../utils/codigos";
import type { CadastroFuncionarioInput } from "../../schemas/Cadastro/CadastroFuncionarioSchema";
import type { CadastroDisciplinasInput } from "../../schemas/Cadastro/CadastroDisciplinaSchema";
import type { EditarFuncionarioInput } from "../../schemas/Editar/EditarFuncionarioSchema";
import type { EditarProfessorInput } from "../../schemas/Editar/EditarProfessorSchema";
import type { EditarFinanceiroInput } from "../../schemas/Editar/EditarFinanceiroSchema";

interface Flex2ContextProp<
  T extends
    | CadastroAlunoInput
    | CadastroProfessorInput
    | CadastroPagamentoInput
    | CadastroTurmaInput
    | CadastroFuncionarioInput
    | CadastroDisciplinasInput
    | EditarFuncionarioInput
    | EditarProfessorInput
    | EditarFinanceiroInput,
> extends FlexContext<T> {
  opcao1: string;
  opcao2: string;
}

const Flex2Context = <
  T extends
    | CadastroAlunoInput
    | CadastroProfessorInput
    | CadastroPagamentoInput
    | CadastroTurmaInput
    | CadastroFuncionarioInput
    | CadastroDisciplinasInput
    | EditarFuncionarioInput
    | EditarProfessorInput
    | EditarFinanceiroInput,
>({
  opcao1,
  opcao2,
  infos,
  setInfos,
}: Flex2ContextProp<T>) => {
  // Processa a opção recebida e retorna o resultado conforme o contexto de criação de alunos ou professores.
  const tipo1 = IdentificarTipo(opcao1) as keyof T;
  const tipo2 = IdentificarTipo(opcao2) as keyof T;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    Escolhas: keyof T,
  ) => {
    let texto: string | number | string[] = e.target.value;
    if (Escolhas === "cpf") texto = formatCPF(texto);

    if (Escolhas === "telefone" || Escolhas === "telefoneEmergencia")
      texto = formatTelefone(texto);

    if (Escolhas === "valor" || Escolhas === "capacidade")
      texto = parseInt(texto);

    setInfos((prev) => ({
      ...prev,
      [Escolhas]: texto as T[keyof T],
    }));
  };

  const [turmas, setTurmas] = useState([""]);

  useEffect(() => {
    async function fetchData() {
      await http.get("api/turma/validas").then(function (dados) {
        setTurmas(dados.data);
      });
    }
    fetchData();
  }, []);

  // Classes utilitárias do Tailwind utilizadas para estilização dos campos de entrada.
  const baseClass =
    "w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)";

  // Define os tipos de informações exibidas no select com base no tipo fornecido.
  const selectOptions: Record<string, string[]> = {
    turno: ["Selecionar o Turno", "Matutino", "Vespertino", "Noturno"],
    status: ["Ativo", "Inativo", "Suspenso"],
    turma: ["Selecionar Turma", ...(Array.isArray(turmas) ? turmas : [])],
    categoria: ["Selecionar categoria", "Mensalidade", "Material"],
    statuspagamento: ["Selecionar status", "Pendente", "Pago", "Cancelado"],
    metodo: [
      "Selecione um método válido!",
      "Dinheiro",
      "Cartão de Débito",
      "Cartão de Crédito",
      "PIX",
      "Boleto",
    ],
  };

  // Define os tipos de informações exibidas no select com base no tipo fornecido.
  const inputTypes: Record<string, string> = {
    nascimento: "date",
    contratacao: "date",
    dataPagamento: "date",
    dataVencimento: "date",
    email: "email",
    cpf: "text",
    telefone: "text",
    inicio: "time",
    fim: "time",
    salario: "number",
  };

  // Cria o Select ou Input para ser demonstrado
  const TipoDiv = (Escolhas: keyof T) => {
    const valor: string = infos[Escolhas] as string;

    if (selectOptions[String(Escolhas)]) {
      return (
        <select
          value={valor}
          onChange={(e) => handleChange(e, Escolhas)}
          className={baseClass}
          id={String(Escolhas)}
          name={String(Escolhas)}
          required
        >
          {selectOptions[String(Escolhas)].map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      );
    }

    const type: string = inputTypes[String(Escolhas)] ?? "text";
    const apenasLer: boolean =
      Escolhas === "codigo" ||
      Escolhas === "matricula" ||
      Escolhas === "registro";

    return apenasLer ? (
      <input
        value={valor}
        onChange={(e) => handleChange(e, Escolhas)}
        type={type}
        className={baseClass}
        id={String(Escolhas)}
        name={String(Escolhas)}
        required
        readOnly
      />
    ) : (
      <input
        value={valor}
        onChange={(e) => handleChange(e, Escolhas)}
        type={type}
        className={baseClass}
        id={String(Escolhas)}
        name={String(Escolhas)}
        required
      />
    );
  };

  return (
    <div className="grid grid-cols-2 gap-5 mb-5">
      <div className="flex flex-col gap-2">
        <label
          className="text-[14px] font-semibold text-(--text-primary)"
          htmlFor={String(tipo1)}
        >
          {opcao1} <span className="text-(--red) ml-0.5">*</span>
        </label>
        {TipoDiv(tipo1)}
      </div>

      <div className="flex flex-col gap-2">
        <label
          className="text-[14px] font-semibold text-(--text-primary)"
          htmlFor={String(tipo2)}
        >
          {opcao2} <span className="text-(--red) ml-0.5">*</span>
        </label>
        {TipoDiv(tipo2)}
      </div>
    </div>
  );
};

export default Flex2Context;
