import { createContext, useContext, useState, type ReactNode } from "react";
import type { CadastroAlunoContextType, CadastroAlunoType } from "../../types/types";
import CadastroTitulo from "../../components/Cadastros/Titulo";
//import { http } from "../../utils/axios";

const CadastroAlunoContext = createContext<CadastroAlunoContextType | undefined>(undefined);
export function CadastroAlunoProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [dados, setDados] = useState<CadastroAlunoType>({
    matricula: 0, status: "", nome: "", turma: "", email: "", telefone: "", endereco: ""
  })
  const [resolveCallback, setResolveCallback] = useState<((data: CadastroAlunoType | null) => void) | null>(null);

  const openMenu = (): Promise<CadastroAlunoType | null> => {
    setMenu(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    if (resolveCallback) {
      //await http
      //.post<CadastroAlunoType>("aluno/cadastro", {
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
    <CadastroAlunoContext.Provider value={{ openMenu, setDados }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}>
            <CadastroTitulo titulo="Cadastrar Novo Aluno" cancelar={Cancel} />

            <form className="p-7 overflow-y-auto flex-1">
              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">Informações Pessoais</h3>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="matricula">Matrícula <span className="text-(--red) ml-0.5">*</span></label>
                    <input className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="text" id="matricula" name="matricula" required />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="status">Status <span className="text-(--red) ml-0.5">*</span></label>
                    <select value={dados.status} onChange={(e) => setDados((prevDados) => ({ ...prevDados, status: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="status" name="status" required>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Suspenso">Suspenso</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="m">Nome Completo <span className="text-(--red) ml-0.5">*</span></label>
                    <input value={dados.nome} onChange={(e) => setDados((prevDados) => ({ ...prevDados, nome: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="text" id="nome" name="nome" placeholder="Digite o nome completo do aluno" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="dataNascimento">Data de Nascimento <span className="text-(--red) ml-0.5">*</span></label>
                    <input className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="date" id="dataNascimento" name="dataNascimento" required />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="turma">Turma <span className="text-(--red) ml-0.5">*</span></label>
                    <select value={dados.turma} onChange={(e) => setDados((prevDados) => ({ ...prevDados, turma: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="turma" name="turma" required>
                      <option value="">Selecione a turma</option>
                      <option value="9º A">9º A</option>
                      <option value="9º B">9º B</option>
                      <option value="8º A">8º A</option>
                      <option value="8º B">8º B</option>
                      <option value="7º A">7º A</option>
                      <option value="7º B">7º B</option>
                      <option value="6º A">6º A</option>
                      <option value="6º B">6º B</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-7">
                <h3 className="text-[15px] font-bold text-(--text-primary) mb-4 pb-2 border-b-2 border-(--border-color)">Contato</h3>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="email">E-mail <span className="text-(--red) ml-0.5">*</span></label>
                    <input value={dados.email} onChange={(e) => setDados((prevDados) => ({ ...prevDados, email: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="email" id="email" name="email" required />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="telefone">Telefone <span className="text-(--red) ml-0.5">*</span></label>
                    <input value={dados.telefone} onChange={(e) => setDados((prevDados) => ({ ...prevDados, telefone: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" type="telefone" id="telefone" name="telefone" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 mb-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-semibold text-(--text-primary)" htmlFor="Endereço">Endereço <span className="text-(--red) ml-0.5">*</span></label>
                    <textarea value={dados.endereco} onChange={(e) => setDados((prevDados) => ({ ...prevDados, endereco: e.target.value }))} className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)" id="Endereço" name="Endereço" placeholder="Rua, número, bairro, cidade - Estado"></textarea>
                  </div>
                </div>
              </div>
            </form>
            <div className="py-5 px-7 border-t border-(--border-color) flex justify-end gap-3 bg-[#0000001A]">
              <button onClick={Cancel} type="button" className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-transparent text-(--text-secondary) border border-(--border-color) hover:bg-(--alert-color) hover:text-(--text-secondary)">Cancelar</button>
              <button onClick={Confirm} type="submit" className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-(--primary-color) text-white border border-(--primary-color) hover:bg-(--primary-hover) -translate-y-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Salvar Aluno
              </button>
            </div>
          </div>
        </div>
      )
      }
    </CadastroAlunoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCadastroAluno() {
  const context = useContext(CadastroAlunoContext);
  if (!context) {
    throw new Error("useCadastroAluno deve ser usado dentro do CadastroAlunoProvider");
  }
  return context;
}
