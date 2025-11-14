import type { AlunoInput } from "../../../schemas/alunoSchema";
import type {
  CadastroProfessorType,
} from "../../../types/types";

type CadastroFlex1Props<T extends AlunoInput | CadastroProfessorType> = {
  titulo: string;
  infos: T;
  setInfos: React.Dispatch<React.SetStateAction<T>>;
  place: string;
};

const CadastroFlex1 = <T extends AlunoInput | CadastroProfessorType>({
  titulo,
  infos,
  setInfos,
  place,
}: CadastroFlex1Props<T>) => {
  const Tipo = (dado: string) => {
    switch (dado) {
      case "Nome completo":
        return "nome";
      case "Endereço":
        return "endereco";
      default:
        return "";
    }
  };

  const tipo = Tipo(titulo) as keyof T;

  const TipoDiv = () => {
    switch (tipo) {
      case "nome":
      case "endereco":
        return (
          <input
            value={infos[tipo] as string}
            onChange={(e) =>
              setInfos((prevDados) => ({
                ...prevDados,
                [tipo]: e.target.value,
              }))
            }
            type={tipo === "endereco" ? "textarea" : "text"}
            className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
            id={String(tipo)}
            name={String(tipo)}
            placeholder={place}
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 mb-5">
      <div className="flex flex-col gap-2">
        <label
          className="text-[14px] font-semibold text-(--text-primary)"
          htmlFor={String(tipo)}
        >
          {titulo} <span className="text-(--red) ml-0.5">*</span>
        </label>
        {TipoDiv()}
      </div>
    </div>
  );
};

export default CadastroFlex1;
