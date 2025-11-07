import { useEffect, useMemo, useState } from "react";
import Aside from "../../../components/Aside";
import Main from "../../../components/Main";
import SelectAlunos from "../../../components/Administracao/SelectAlunos";
import ModoExibicao from "../../../components/Administracao/ModoExibicao";
import type { AlunosType } from "../../../types/types";

const AlunosAdmin = () => {
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

  const AtualizarPagina = () => {
    setMostrar((prevDados) =>
      prevDados + 6
    );
    setPagina((prevDados) => ({
      ...prevDados,
      atual:
        prevDados.atual + 1 > prevDados.maxima
          ? prevDados.maxima
          : prevDados.atual + 1,
    }));
  };

  const VoltarPagina = () => {
    setMostrar((prevDados) => (prevDados - 6 <= 6 ? 6 : prevDados - 6));
    setPagina((prevDados) => ({
      ...prevDados,
      atual: prevDados.atual - 1 > 1 ? prevDados.atual - 1 : 1,
    }));
  };

  const head: string[] = [
    "Matrículo",
    "Nome",
    "Turma",
    "E-mail",
    "Telefone",
    "Status",
    "Média",
    "Ação",
  ];

  const [alunos] = useState<AlunosType[]>([
    {
      ra: "2024001",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "2024002",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º B",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "2024003",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º B",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Inativo",
      media: 8.5,
    },
    {
      ra: "2024004",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Inativo",
      media: 8.5,
    },
    {
      ra: "2024005",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º B",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "2024006",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Suspenso",
      media: 8.5,
    },
    {
      ra: "2024007",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º B",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Suspenso",
      media: 8.5,
    },
    {
      ra: "2024008",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "2024009",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "20240010",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "20240011",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
    {
      ra: "20240012",
      nome: "Fabrício Peres",
      nasc: "3 de Abr, 2024",
      turma: "9º A",
      email: "fabricio.santos@gmail.com",
      telefone: "(11) 95599-2605",
      status: "Ativo",
      media: 8.5,
    },
  ]);

  const AlunosFiltrados = useMemo(() => {
    const termo = pesquisa.toLowerCase();
    return alunos.filter((itens) => {
      const conteudo = `
        ${itens.ra.toLowerCase()}
        ${itens.nome.toLowerCase()}
        ${itens.nasc.toLowerCase()}
        ${itens.turma.toLowerCase()}
        ${itens.email.toLowerCase()}
        ${itens.telefone.toLowerCase()}
        ${itens.status.toLowerCase()}
        ${itens.media}
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
  }, [alunos, pesquisa, selecionada, status]);

  useEffect(() => {
    setPagina((prevDados) => ({
      ...prevDados,
      maxima:
        AlunosFiltrados.length % 6 === 0
          ? AlunosFiltrados.length / 6
          : Math.floor(AlunosFiltrados.length / 6) + 1,
    }));
  }, [AlunosFiltrados]);

  return (
    <>
      <Aside />

      <Main
        titulo="Gerenciamento de Alunos"
        desc="Visualize e Gerencie as informações dos estudantes"
      >
        <div className="flex justify-between items-center gap-5 mb-6 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            <SelectAlunos
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
            <thead style={{ background: "rgba(0, 0, 0, 0.2)" }}>
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
              {AlunosFiltrados.slice(mostrar - 6, mostrar).map((item) => (
                <tr
                  key={item.ra}
                  className="hover:bg-[#3B82F60D] text-(--text-primary)"
                >
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <span className="font-semibold text-(--primary-color) text-[13px]">
                      {item.ra}
                    </span>
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-[50%] object-cover border-2 border-(--border-color)"
                        src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=60"
                        alt="Imagem do Aluno"
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
                    <span className="inline-block py-1.5 px-3 rounded-[20px] text-[12px] font-semibold">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 border-b-2 border-(--border-color) text-[14px]">
                    <span className="inline-block py-1.5 px-3 text-(--primary-color) rounded-md font-semibold text-[13px] bg-[#3B82F626]">
                      {item.media}
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
            onClick={VoltarPagina}
            className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium cursor-pointer hover:bg-(--bg-input) hover:border-(--border-light)"
          >
            Anterior
          </button>
          <div className="text-[14px] text-(--text-secondary)">
            Página {pagina.atual} de {pagina.maxima} ({AlunosFiltrados.length} alunos)
          </div>
          <button
            onClick={AtualizarPagina}
            className="py-2.5 px-4 bg-transparent border-2 border-(--border-color) text-(--text-primary) text-[14px] font-medium cursor-pointer hover:bg-(--bg-input) hover:border-(--border-light)"
          >
            Próximo
          </button>
        </div>
      </Main>
    </>
  );
};

export default AlunosAdmin;
