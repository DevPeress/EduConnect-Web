import {
  CadastrarAluno,
  LancarNota,
  RegistrarPresenca,
  GerarRelatorio,
} from "../../assets/HTML";
import { useAuth, useBoletimMenu, useCadastroMenu } from "../../context";
import { http } from "../../utils/axios";

const AcoesRapidas = () => {
  const { cadastroAluno } = useCadastroMenu();
  const openMenu = useBoletimMenu();
  const auth = useAuth();
  const cargo = auth.cargo;

  let tipos = [
    "Gerar Boletim"
  ]

  if (cargo === "Aluno") {
    tipos = [...tipos];
  } else if (cargo === "Professor") {
    tipos = ["Lançar Nota", "Registrar Presença", ...tipos];
  } else if (cargo === "Administrador" || cargo === "Funcionário") {
    tipos = ["Novo Aluno", "Lançar Nota", "Registrar Presença", ...tipos];
  }

  // Processa a opção recebida e retorna o título, o ícone SVG, o background e a cor de acordo com o tipo informado.
  const Acao = (tipo: string) => {
    switch (tipo) {
      case "Novo Aluno":
        return {
          msg: "Cadastrar novo Estudante",
          svg: <CadastrarAluno />,
          bg: "rgba(59, 130, 246, 0.15)",
          color: "var(--blue)",
        };
      case "Lançar Nota":
        return {
          msg: "Registrar avaliações",
          svg: <LancarNota />,
          bg: "rgba(16, 185, 129, 0.15)",
          color: "var(--green)",
        };
      case "Registrar Presença":
        return {
          msg: "Marcar frequência",
          svg: <RegistrarPresenca />,
          bg: "rgba(245, 158, 11, 0.15)",
          color: "var(--orange)",
        };
      case "Gerar Relatório":
        return {
          msg: "Visualizar Dados",
          svg: <GerarRelatorio />,
          bg: "rgba(139, 92, 246, 0.15)",
          color: "var(--purple)",
        };
    }
  };

  const gerarBoletim = async () => {
    if (cargo === "Aluno") {
      const { data } = await http.get("/api/auth/usuario");
      const registro = data.id;

      baixarBoletim(registro);
    } else {
      const registro = await openMenu();

      if (!registro) return;

      baixarBoletim(registro);
    }
  };

  const baixarBoletim = async (registro: string) => {
    const response = await http.get(`/api/alunos/boletim/${registro}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "boletim.pdf";

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div
      className="bg-(--bg-card) border-2 border-(--border-color) rounded-lg overflow-hidden"
      style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
    >
      <div className="py-5 px-6 border-b-2 border-(--border-color) flex justify-between items-center bg-(--cabecalho)">
        <h2 className="text-[16px] font-semibold text-(--text-primary)">
          Ações Rápidas
        </h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-1">
          {tipos.map((item) => (
            <button
              onClick={async () => {
                if (item === "Novo Aluno") return cadastroAluno();
                if (item === "Gerar Boletim") return gerarBoletim();
              }}
              key={item}
              className="flex items-center gap-3.5 p-3.5 bg-transparent border-2 border-(--border-color) rounded-[10px] cursor-pointer text-left w-full hover:bg-(--bg-hover) hover:border-(--border-light) hover:translate-x-1"
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
                style={{
                  background: Acao(item)?.bg,
                  color: Acao(item)?.color,
                }}
              >
                {Acao(item)?.svg}
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-[14px] font-semibold text-(--text-primary)">
                  {item}
                </span>
                <span className="text-[12px] text-(--text-muted)">
                  {Acao(item)?.msg}
                </span>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcoesRapidas;
