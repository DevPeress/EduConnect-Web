import { useEffect, useState } from "react";
import type { CadastroAlunoInput } from "../../schemas/Cadastro/CadastroAlunoSchema";
import type { CadastroFuncionarioInput } from "../../schemas/Cadastro/CadastroFuncionarioSchema";
import type { CadastroPagamentoInput } from "../../schemas/Cadastro/CadastroPagementoSchema";
import type { CadastroProfessorInput } from "../../schemas/Cadastro/CadastroProfessorSchema";
import type { CadastroTurmaInput } from "../../schemas/Cadastro/CadastroTurmaSchema";
import type { FlexContext } from "../../types/types";
import { IdentificarTipo } from "../../utils/codigos";
import type { CadastroDisciplinasInput } from "../../schemas/Cadastro/CadastroDisciplinaSchema";
import type { EditarFuncionarioInput } from "../../schemas/Editar/EditarFuncionarioSchema";
import type { EditarProfessorInput } from "../../schemas/Editar/EditarProfessorSchema";
import type { EditarFinanceiroInput } from "../../schemas/Editar/EditarFinanceiroSchema";

type Disciplina = {
  registro: string;
  nome: string;
};

interface Flex1ContextProp<
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
  titulo: string;
  place: string;
}

const Flex1Context = <
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
  titulo,
  infos,
  setInfos,
  place,
}: Flex1ContextProp<T>) => {
  // Processa a opção recebida e retorna o resultado conforme o contexto de criação de alunos ou professores.
  const tipo = IdentificarTipo(titulo) as keyof T;
  const [selecionadas, setSelecionadas] = useState<Disciplina[]>([]);

  const dias = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  const [selecionadasDia, setSelecionadasDia] = useState<string[]>([]);
  const disciplinasValidas: Disciplina[] = temDisciplinasValidas(infos)
    ? infos.disciplinasValidas
    : [];

  function adicionarDisciplina(registro: string) {
    const disciplina = disciplinasValidas.find((d) => d.registro === registro);

    if (!disciplina) return;

    // evita duplicar
    if (selecionadas.some((d) => d.registro === registro)) return;

    const novas = [...selecionadas, disciplina];
    setSelecionadas(novas);

    // sincroniza com o form (envia só os registros)
    setInfos((prev) => ({
      ...prev,
      disciplinas: novas.map((d) => d.registro),
    }));
  }

  function removerDisciplina(registro: string) {
    const novas = selecionadas.filter((d) => d.registro !== registro);

    setSelecionadas(novas);

    setInfos((prev) => ({
      ...prev,
      disciplinas: novas.map((d) => d.registro),
    }));
  }

  function temDisciplinasValidas(
    data: T,
  ): data is T & { disciplinasValidas: Disciplina[] } {
    return (
      "disciplinasValidas" in data && Array.isArray(data.disciplinasValidas)
    );
  }

  useEffect(() => {
    setInfos((prev) => ({
      ...prev,
      dias: selecionadasDia,
    }));
  }, [selecionadasDia, setInfos]);

  useEffect(() => {
    setInfos((prev) => ({
      ...prev,
      disciplinas: selecionadas.map((d) => d.registro),
    }));
  }, [selecionadas, setInfos]);

  // Cria o Select ou Input para ser demonstrado
  const TipoDiv = () => {
    switch (tipo) {
      case "nome":
      case "descricao":
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
      case "semana":
        return (
          <div className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)">
            <select
              className="w-full bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] px-3 py-2 text-(--text-primary) text-[14px]"
              onChange={(e) =>
                setSelecionadasDia((prev) => [...prev, e.target.value])
              }
              defaultValue=""
            >
              <option value="" disabled>
                Selecionar dias da Semana
              </option>

              {dias.map((d) => (
                <option
                  key={d}
                  value={d}
                  disabled={selecionadasDia.some((s) => s === d)}
                >
                  {d}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 py-2">
              {selecionadasDia.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {d}
                  <button
                    onClick={() =>
                      setSelecionadasDia(
                        selecionadasDia.filter((dados) => dados !== d),
                      )
                    }
                    className="text-blue-600 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        );
      case "disciplinas":
        return (
          <div className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)">
            <select
              className="w-full bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] px-3 py-2 text-(--text-primary) text-[14px]"
              onChange={(e) => adicionarDisciplina(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Selecionar disciplina
              </option>

              {temDisciplinasValidas(infos) &&
                infos.disciplinasValidas.map((d) => (
                  <option
                    key={d.registro}
                    value={d.registro}
                    disabled={selecionadas.some(
                      (s) => s.registro === d.registro,
                    )}
                  >
                    {d.nome}
                  </option>
                ))}
            </select>

            <div className="flex flex-wrap gap-2 py-2">
              {selecionadas.map((d) => (
                <span
                  key={d.registro}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {d.nome}
                  <button
                    onClick={() => removerDisciplina(d.registro)}
                    className="text-blue-600 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
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

export default Flex1Context;
