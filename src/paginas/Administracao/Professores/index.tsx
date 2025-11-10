import { useEffect, useMemo, useState } from "react";
import Aside from "../../../components/Aside";
import Main from "../../../components/Main";
import ModoExibicao from "../../../components/Administracao/ModoExibicao";
import type { ProfessorType } from "../../../types/types";
import SelectProfessores from "../../../components/Administracao/SelectProfessores";
import { useCadastroProfessor } from "../../../context/CadastroProfessorContext";

const ProfessoresAdmin = () => {
  const { openMenu } = useCadastroProfessor();
  const [modo, setModo] = useState<boolean>(false);
  const [salas] = useState<string[]>(["Todas as Salas", "9º A", "9º B"]);
  const [selecionada, setSelecionada] = useState<string>("Todas as Salas");
  const [status, setStatus] = useState<string>("Todos os Status");
  const [pesquisa] = useState<string>("");
  const [mostrar, setMostrar] = useState<number>(6);
  const [pagina, setPagina] = useState<{ atual: number; maxima: number }>({
    atual: 1,
    maxima: 1,
  });

  const ProximaPagina = () => {
    setMostrar((prevDados) => prevDados + 6);
    setPagina((prevDados) => ({
      ...prevDados,
      atual:
        prevDados.atual + 1 > prevDados.maxima
          ? prevDados.maxima
          : prevDados.atual + 1,
    }));
  };

  const VoltarPagina = () => {
    setMostrar((prevDados) => prevDados - 6);
    setPagina((prevDados) => ({
      ...prevDados,
      atual: prevDados.atual - 1,
    }));
  };

  const head: string[] = [
    "Código",
    "Nome",
    "Turmas",
    "E-mail",
    "Telefone",
    "Status",
    "Ação"
  ];

  const [professores, setProfessores] = useState<ProfessorType[]>([
    {
      nome: "Fabrício Peres",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      codigo: "01",
      nasc: "3 de Abr, 2024",
    },
    {
      nome: "Fabrício Peres",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      codigo: "02",
      nasc: "3 de Abr, 2024",
    },
  ]);

  const ProfessoresFiltrados = useMemo(() => {
    const termo = pesquisa.toLowerCase();
    return professores.filter((itens) => {
      const conteudo = `
        ${itens.codigo.toLowerCase()}
        ${itens.nome.toLowerCase()}
        ${itens.turma.toLowerCase()}
        ${itens.email.toLowerCase()}
        ${itens.telefone.toLowerCase()}
        ${itens.status.toLowerCase()}
        ${itens.nasc.toLowerCase()}
        `;

      const correspondeTurma =
        selecionada === "Todas as Salas" ||
        itens.turma.toLowerCase() === selecionada.toLowerCase();
      const correspondeStatus =
        status === "Todos os Status" ||
        itens.status.toLowerCase() === status.toLowerCase();
      const correspondetes =
        conteudo.includes(termo) && correspondeTurma && correspondeStatus;
      return correspondetes;
    });
  }, [professores, pesquisa, selecionada, status]);

  useEffect(() => {
    setPagina((prevDados) => ({
      ...prevDados,
      maxima:
        ProfessoresFiltrados.length % 6 === 0
          ? ProfessoresFiltrados.length / 6
          : Math.floor(ProfessoresFiltrados.length / 6) + 1,
    }));
  }, [ProfessoresFiltrados]);

  const AdicionarProfessor = async () => {
    const dados = await openMenu();
    if (!dados)
      return
    return setProfessores((prevDados) => [
      ...prevDados,
      {
        nome: dados.nome,
        turma: dados.turma,
        email: dados.email,
        telefone: dados.telefone,
        status: dados.status,
        codigo: dados.codigo,
        nasc: dados.nascimento,
      }
    ])
  };

  return (
    <>
      <Aside />

      <Main
        titulo="Gerenciamento de Professores"
        desc="Visualize e Gerencie as informações dos professores"
        botao={{
          ativo: true,
          mensagem: "Novo Professor",
          adicionar: AdicionarProfessor,
        }}
      >
        <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <SelectProfessores
              salas={salas}
              selecionada={setSelecionada}
              status={setStatus}
            />
          </div>

          <div className="flex gap-2 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] p-1.5">
            <ModoExibicao modoExibir={modo} trocarModo={() => setModo(!modo)} />
          </div>
        </div>

        <div className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden mb-6">
          <table className="w-full border-collapse">
            <thead className="bg-(--cabecalho)">
              <tr>
                {head.map((item) => (
                  <th
                    key={item}
                    className="py-4 px-5 text-left text-[13px] font-semibold text-(--text-muted) uppercase leading-4 border-b-2 border-(--border-color)"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ProfessoresFiltrados.slice(mostrar - 6, mostrar).map((item) => (
                <tr
                  key={item.codigo}
                  className="hover:bg-(--bg-input) text-(--text-primary)"
                >
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <span className="font-semibold text-(--primary-color) text-[13px]">
                      {item.codigo}
                    </span>
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-[50%] object-cover border-2 border-(--border-color)"
                        src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=60"
                        alt="Imagem do Professor"
                      />
                      <div>
                        <p className="font-semibold">{item.nome}</p>
                        <p className="text-[12px] text-(--text-muted)">
                          {item.nasc}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    {item.turma}
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    {item.email}
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    {item.telefone}
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <span
                      className="inline-block py-1.5 px-3 rounded-[20px] text-[12px] font-semibold"
                      style={{
                        background:
                          item.status === "Ativo"
                            ? "rgba(16, 185, 129, 0.15)"
                            : item.status === "Inativo"
                              ? "rgba(156, 163, 175, 0.15)"
                              : "rgba(239, 68, 68, 0.15)",
                        color:
                          item.status === "Ativo"
                            ? "var(--green)"
                            : item.status === "Inativo"
                              ? "var(--text-secondary)"
                              : "var(--red)",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <button className="relative bg-transparent border-none text-(--text-secondary) cursor-pointer py-1 px-2 rounded-sm flex items-center justify-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                      </svg>
                    </button>
                    <div className="absolute top-full r-0 bg-(--bg-card) border-2 border-(--border-color) rounded-[10px] min-w-40 z-10 opacity-0 hidden -translate-y-2.5 mt-1">
                      <div className="block py-2.5 px-4 text-(--text-primary) text-[13px] hover:text-(--primary-color) pl-5">
                        Visualizar
                      </div>
                      <div className="block py-2.5 px-4 text-(--text-primary) text-[13px] hover:text-(--primary-color) pl-5">
                        Editar
                      </div>
                      <div className="block py-2.5 px-4 text-(--text-primary) text-[13px] hover:text-(--red) pl-5">
                        Deletar
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-5 mt-8 pt-5 border-t-2 border-(--border-color)">
          <button
            onClick={() => (pagina.atual === 1 ? null : VoltarPagina())}
            className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
            style={{
              opacity: pagina.atual === 1 ? "0.5" : "1",
              cursor: pagina.atual === 1 ? "not-allowed" : "pointer",
            }}
          >
            Anterior
          </button>
          <div className="text-[14px] text-(--text-secondary)">
            Página {pagina.atual} de {pagina.maxima} (
            {ProfessoresFiltrados.length} professores)
          </div>
          <button
            onClick={() =>
              pagina.atual === pagina.maxima ? null : ProximaPagina()
            }
            className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium rounded-lg hover:bg-(--bg-input) hover:border-(--border-light)"
            style={{
              opacity: pagina.maxima === pagina.atual ? "0.5" : "1",
              cursor:
                pagina.maxima === pagina.atual ? "not-allowed" : "pointer",
            }}
          >
            Próximo
          </button>
        </div>
      </Main>
    </>
  );
};

export default ProfessoresAdmin;
