import type {
  CadastroAlunoType,
  CadastroProfessorType,
} from "../../../types/types";
import { formatCPF, formatTelefone } from "../../../utils/codigos";

type CadastroFlex2Props<T extends CadastroAlunoType | CadastroProfessorType> = {
  opcao1: string;
  opcao2: string;
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
};

const CadastroFlex2 = <T extends CadastroAlunoType | CadastroProfessorType>({
  opcao1,
  opcao2,
  infos,
  setInfos,
}: CadastroFlex2Props<T>) => {
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

    if (Escolhas === "telefone") texto = formatTelefone(texto);

    setInfos((prev) => ({
      ...prev,
      [Escolhas]: texto as T[keyof T],
    }));
  };

  const baseClass =
    "w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)";

  const selectOptions: Record<string, string[]> = {
    status: ["Ativo", "Inativo", "Suspenso"],
    turma: ["1A", "2B", "3C"],
  };

  const inputTypes: Record<string, string> = {
    nascimento: "date",
    contratacao: "date",
    email: "email",
    cpf: "text",
    telefone: "text",
  };

  const TipoDiv = (Escolhas: keyof T) => {
    const valor = infos[Escolhas] as string;

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

    const type = inputTypes[String(Escolhas)] ?? "text";

    return (
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
