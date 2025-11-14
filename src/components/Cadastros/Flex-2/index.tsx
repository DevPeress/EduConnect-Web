import type { CadastroAlunoInput } from "../../../schemas/alunoSchema";
import type { CadastroProfessorInput } from "../../../schemas/professorSchema";
import { formatCPF, formatTelefone } from "../../../utils/codigos";

type CadastroFlex2Props<T extends CadastroAlunoInput | CadastroProfessorInput> =
  {
    opcao1: string;
    opcao2: string;
    infos: T;
    setInfos: React.Dispatch<React.SetStateAction<T>>;
  };

const CadastroFlex2 = <T extends CadastroAlunoInput | CadastroProfessorInput>({
  opcao1,
  opcao2,
  infos,
  setInfos,
}: CadastroFlex2Props<T>) => {
  // Processa a opção recebida e retorna o resultado conforme o contexto de criação de alunos ou professores.
  const Tipo = (dado: string) => {
    switch (dado) {
      case "Matrícula":
        return "matricula";
      case "Código":
        return "codigo";
      case "Status":
        return "status";
      case "Data de Nascimento":
        return "nascimento";
      case "Data de Contratação":
        return "contratacao";
      case "Turma":
        return "turma";
      case "E-mail":
        return "email";
      case "Telefone":
        return "telefone";
      case "Disciplina Principal":
        return "disciplina";
      case "Formação Academica":
        return "formacao";
      case "Endereço":
        return "endereco";
      case "Telefone de Emergência":
        return "emergencia";
      case "CPF/Documento":
        return "cpf";
      default:
        return "";
    }
  };

  const tipo1 = Tipo(opcao1) as keyof T;
  const tipo2 = Tipo(opcao2) as keyof T;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    Escolhas: keyof T
  ) => {
    let texto = e.target.value;
    if (Escolhas === "cpf") texto = formatCPF(texto);

    if (Escolhas === "telefone" || Escolhas === "emergencia")
      texto = formatTelefone(texto);

    setInfos((prev) => ({
      ...prev,
      [Escolhas]: texto as T[keyof T],
    }));
  };

  // Classes utilitárias do Tailwind utilizadas para estilização dos campos de entrada.
  const baseClass =
    "w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)";

  // Define os tipos de informações exibidas no select com base no tipo fornecido.
  const selectOptions: Record<string, string[]> = {
    status: ["Ativo", "Inativo", "Suspenso"],
    turma: ["Selecionar Turma", "1A", "2B", "3C"],
  };

  // Define os tipos de informações exibidas no select com base no tipo fornecido.
  const inputTypes: Record<string, string> = {
    nascimento: "date",
    contratacao: "date",
    email: "email",
    cpf: "text",
    telefone: "text",
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
      Escolhas === "codigo" || Escolhas === "matricula";

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

export default CadastroFlex2;
