import { createContext, useContext, useState, type ReactNode } from "react";
import type { CadastroProfessorContextType, CadastroProfessorType } from "../../types/types";
import CadastroTitulo from "../../components/Cadastros/Titulo";
import CadastroFlex2 from "../../components/Cadastros/Flex-2";
import CadastroFlex1 from "../../components/Cadastros/Flex-1";
//import { http } from "../../utils/axios";

const CadastroProfessorContext = createContext<CadastroProfessorContextType | undefined>(undefined);
export function CadastroProfessorProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroProfessorType>({
    codigo: "", nascimento: "", status: "", nome: "", turma: "", email: "", telefone: "", endereco: ""
  })
  const [resolveCallback, setResolveCallback] = useState<((data: CadastroProfessorType | null) => void) | null>(null);

  const openMenu = (): Promise<CadastroProfessorType | null> => {
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    if (resolveCallback) {
      //await http
      //.post<CadastroProfessorType>("prfessor/cadastro", {
      //matricula: dados.matricula,
      //status: dados.status,
      //nome: dados.nome,
      //turma: dados.turma,
      //email: dados.email,
      //telefone: dados.telefone,
      //endereco: dados.endereco
      //})
      //.then(function () {
      //  resolveCallback(dados);
      //  setResolveCallback(null);
      //})
      //.then(function (error) {
      //  console.log(error);
      //});

      resolveCallback(dados);
      setResolveCallback(null);
    }
    setMenu(false);
  };

  const Cancel = () => {
    if (resolveCallback) {
      resolveCallback(null);
      setResolveCallback(null);
    }
    setMenu(false);
  };

  return (
    <CadastroProfessorContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}>
            <CadastroTitulo titulo="Cadastrar Novo Professor" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">Informações Pessoais</h3>
                <CadastroFlex2 opcao1="Matrícula" opcao2="Status" infos={dados} setInfos={setDados} />

                <CadastroFlex1 titulo="Nome completo" infos={dados} setInfos={setDados} place="Digite o nome completo do professor" />

                <CadastroFlex2 opcao1="Data de Nascimento" opcao2="Turma" infos={dados} setInfos={setDados} />
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">Contato</h3>
                <CadastroFlex2 opcao1="E-mail" opcao2="Telefone" infos={dados} setInfos={setDados} />

                <CadastroFlex1 titulo="Endereço" infos={dados} setInfos={setDados} place="Rua, número, bairro, cidade - Estado" />
              </div>
            </form>
            <div className="py-5 px-7 border-t border-(--border-color) flex justify-end gap-3 bg-[#0000001A]">
              <button onClick={Cancel} type="button" className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-transparent text-(--text-secondary) border border-(--border-color) hover:bg-(--alert-color) hover:text-(--text-secondary)">Cancelar</button>
              <button onClick={Confirm} type="submit" className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-(--primary-color) text-white border border-(--primary-color) hover:bg-(--primary-hover) -translate-y-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Salvar Professor
              </button>
            </div>
          </div>
        </div>
      )
      }
    </CadastroProfessorContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCadastroProfessor() {
  const context = useContext(CadastroProfessorContext);
  if (!context) {
    throw new Error("useCadastroProfessor deve ser usado dentro do CadastroProfessorProvider");
  }
  return context;
}
