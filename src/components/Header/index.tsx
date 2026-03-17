import { useEffect, useState } from "react";
import Dia from "../../assets/SVG/Dia.svg";
import Noite from "../../assets/SVG/Noite.svg";
import { http } from "../../utils/axios";
import { useAuth, useTheme } from "../../context";

const Header = ({
  exibirPesquisa,
}: {
  exibirPesquisa: {
    exibir: boolean;
    valor?: string;
    set?: (valor: string) => void;
  };
}) => {
  const tema = useTheme();
  const dark = tema.dark;
  const auth = useAuth();
  const cargo = auth.cargo;
  const [loading, setLoading] = useState<boolean>(true);

  const [dados, setDados] = useState({ nome: "", foto: "" });

  useEffect(() => {
    async function PegarUsuario() {
      const saved = localStorage.getItem("usuario");
      if (saved) {
        const dados = JSON.parse(saved);
        setDados({ nome: dados.nome, foto: dados.foto });
        return setLoading(false);
      }

      const { data } = await http.get("/api/auth/usuario");

      if (!data) return setLoading(false);
      const usuario = {
        nome: data.nome,
        foto: data.foto,
      };
      setDados({ nome: data.nome, foto: data.foto });
      localStorage.setItem("usuario", JSON.stringify(usuario));
      return setLoading(false);
    }

    PegarUsuario();
  }, []);

  if (loading) return <></>;

  return (
    <header className="bg-(--bg-sidebar) border-b-2 border-(--border-color) px-9.5 h-19.25 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        {exibirPesquisa.exibir && (
          <>
            <button className="flex bg-transparent border-none text-(--text-secondary) cursor-pointer p-4 border-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="relative flex-1 max-w-125">
              <svg
                className="absolute left-3.5 top-[50%] -translate-y-[50%] text-(--text-muted) pointer-events-none"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                value={exibirPesquisa.valor}
                onChange={(e) => exibirPesquisa.set?.(e.target.value)}
                className="w-full bg-(--bg-input) border-2 border-(--border-color) rounded-2xl pt-3 pr-4 pb-3 pl-10 text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color) focus:bg-(--bg-card)"
                type="text"
                placeholder="Buscar por nome ou matrícula..."
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative bg-transparent border-none text-(--text-secondary) cursor-pointer p-2 rounded-[10px] hover:bg-(--bg-hover) hover:text-(--text-primary)">
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
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="absolute top-1 right-1 bg-(--red) text-white text-[10px] font-bold px-1 py-1.25 rounded-lg leading-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer rounded-[10px] pt-1.5 pr-3 pb-1.5 pl-1.5 hover:bg-(--bg-hover)">
          <img
            src={dados.foto}
            alt="User"
            className="w-10 h-10 rounded-[50%] object-cover border-2 border-(--border-color)"
          />
          <div className="flex flex-col leading-3.5">
            <span className="text-[14px] font-semibold text-(--text-primary)">
              {dados.nome}
            </span>
            <span className="text-[12px] text-(--text-muted)">{cargo}</span>
          </div>
        </div>
        <div className="max-w-15">
          {dark ? (
            <img src={Noite} alt="" onClick={() => tema.toggleTheme()} />
          ) : (
            <img src={Dia} alt="" onClick={() => tema.toggleTheme()} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
