import type {
  CadastroAlunoType,
  CadastroProfessorType,
} from "../../../types/types";

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
      case "Status":
        return "status";
      case "Data de Nascimento":
        return "nascimento";
      case "Turma":
        return "turma";
      case "E-mail":
        return "email";
      case "Telefone":
        return "telefone";
      default:
        return "";
    }
  };

  const tipo1 = Tipo(opcao1) as keyof T;
  const tipo2 = Tipo(opcao2) as keyof T;

  const TipoDiv = (Escolhas: keyof T) => {
    switch (Escolhas) {
      case "nascimento":
        return (
          <input
            value={infos[Escolhas] as string}
            onChange={(e) =>
              setInfos((prev) => ({
                ...prev,
                [Escolhas]: e.target.value as T[keyof T],
              }))
            }
            type="date"
            className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
            id="nasc"
            name="nasc"
            required
          />
        );
      case "email":
        return (
          <input
            value={infos[Escolhas] as string}
            onChange={(e) =>
              setInfos((prev) => ({
                ...prev,
                [Escolhas]: e.target.value as T[keyof T],
              }))
            }
            type="email"
            className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
            id="email"
            name="email"
            required
          />
        );
      case "telefone":
        return (
          <input
            value={infos[Escolhas] as string}
            onChange={(e) =>
              setInfos((prev) => ({
                ...prev,
                [Escolhas]: e.target.value as T[keyof T],
              }))
            }
            type="text"
            className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
            id="telefone"
            name="telefone"
            required
          />
        );
      case "status":
        return (
          <select
            value={infos[Escolhas] as string}
            onChange={(e) =>
              setInfos((prev) => ({
                ...prev,
                [Escolhas]: e.target.value as T[keyof T],
              }))
            }
            className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
            id={String(Escolhas)}
            name={String(Escolhas)}
            required
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Suspenso">Suspenso</option>
          </select>
        );
      case "turma":
        return (
          <select
            value={infos[Escolhas] as string}
            onChange={(e) =>
              setInfos((prev) => ({
                ...prev,
                [Escolhas]: e.target.value as T[keyof T],
              }))
            }
            className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
            id={String(Escolhas)}
            name={String(Escolhas)}
            required
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Suspenso">Suspenso</option>
          </select>
        );
      default:
        return null;
    }
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
