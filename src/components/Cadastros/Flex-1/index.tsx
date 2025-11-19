import type { CadastroAlunoInput } from "../../../schemas/alunoSchema";
import type { CadastroProfessorInput } from "../../../schemas/professorSchema";
import type { CadastroFlexProps } from "../../../types/types";

interface CadastroFlex1Prop<
  T extends CadastroAlunoInput | CadastroProfessorInput
> extends CadastroFlexProps<T> {
  titulo: string;
  place: string;
}

const CadastroFlex1 = <T extends CadastroAlunoInput | CadastroProfessorInput>({
  titulo,
  infos,
  setInfos,
  place,
}: CadastroFlex1Prop<T>) => {
  // Processa a opção recebida e retorna o resultado conforme o contexto de criação de alunos ou professores.
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

  // Cria o Select ou Input para ser demonstrado
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
