import { useState } from "react";
import type { CadastroAlunoInput } from "../../schemas/alunoSchema";
import type { CadastroFuncionarioInput } from "../../schemas/funcionarioSchema";
import type { CadastroPagamentoInput } from "../../schemas/pagementoSchema";
import type { CadastroProfessorInput } from "../../schemas/professorSchema";
import type { CadastroTurmaInput } from "../../schemas/turmaSchema";
import type { CadastroFlexProps } from "../../types/types";
import { IdentificarTipo } from "../../utils/codigos";
import { http } from "../../utils/axios";
import type { CadastroDisciplinasInput } from "../../schemas/disciplinaSchema";

type Disciplina = {
  registro: string;
  nome: string;
};

interface CadastroFlex1Prop<
  T extends
    | CadastroAlunoInput
    | CadastroProfessorInput
    | CadastroPagamentoInput
    | CadastroTurmaInput
    | CadastroFuncionarioInput
    | CadastroDisciplinasInput
> extends CadastroFlexProps<T> {
  titulo: string;
  place: string;
}

const CadastroFlex1 = <
  T extends
    | CadastroAlunoInput
    | CadastroProfessorInput
    | CadastroPagamentoInput
    | CadastroTurmaInput
    | CadastroFuncionarioInput
    | CadastroDisciplinasInput
>({
  titulo,
  infos,
  setInfos,
  place,
}: CadastroFlex1Prop<T>) => {
  // Processa a opção recebida e retorna o resultado conforme o contexto de criação de alunos ou professores.
  const tipo = IdentificarTipo(titulo) as keyof T;
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [selecionadas, setSelecionadas] = useState<Disciplina[]>([]);

  const semana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  const [selecionadasSemana, SetSelecionadasSemana] = useState<string[]>([]);

  function adicionarDisciplina(registro: string) {
    const disciplina = disciplinas.find((d) => d.registro === registro);
    if (!disciplina) return;

    // evita duplicar
    if (selecionadas.some((d) => d.registro === registro)) return;

    setSelecionadas((prev) => [...prev, disciplina]);
  }

  function removerDisciplina(registro: string) {
    setSelecionadas((prev) => prev.filter((d) => d.registro !== registro));
  }

  async function asycnDisciplinas() {
    await http.get("api/disciplinas/pegarDisciplinas").then(function (dados) {
      setDisciplinas(dados.data);
    });
  }

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
                SetSelecionadasSemana((prev) => [...prev, e.target.value])
              }
              defaultValue=""
            >
              <option value="" disabled>
                Selecionar dias da Semana
              </option>

              {semana.map((d) => (
                <option
                  key={d}
                  value={d}
                  disabled={selecionadasSemana.some((s) => s === d)}
                >
                  {d}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 py-2">
              {selecionadasSemana.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {d}
                  <button
                    onClick={() =>
                      SetSelecionadasSemana(
                        selecionadasSemana.filter((dados) => dados !== d)
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
        asycnDisciplinas();
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

              {disciplinas.map((d) => (
                <option
                  key={d.registro}
                  value={d.registro}
                  disabled={selecionadas.some((s) => s.registro === d.registro)}
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

export default CadastroFlex1;
