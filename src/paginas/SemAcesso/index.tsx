import { useNavigate } from "react-router-dom";
import FundoBolhas from "../../components/FundoBolhas";
import { Options } from "../../utils/paginação";

const SemAcesso = ({ Logado, Cargo }:  { Logado: boolean, Cargo: string }) => {
    const navegar = useNavigate();
    
    return (
        <FundoBolhas>
            <div className="inline-flex items-center justify-center w-[100px] h-[100px] bg-(--alert-color) rounded-[50%] mb-5 animate-pulse403">
                <svg className="text-[#ef4444] animate-shake" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h1 className="bg-linear-to-br from-[#ef4444] to-[#f59e0b] bg-clip-text text-transparent text-[80px] md:text-[120px] font-extrabold leading-none mb-4">403</h1>
            <h1 className="text-(--text-primary) text-[24px] md:text-[32px] font-bold mb-4">Acesso Negado</h1>
            <p className="text-(--text-secondary) text-[15px] md:text-[16px] leading-normal mb-8">
               Desculpe, você não tem permissão para acessar este recurso. Verifique suas credenciais ou entre em contato com o administrador.
            </p> 

            <div className="flex gap-3 md:gap-4 justify-center mb-10 flex-col md:flex-row">
                <button
                    className="bg-(--primary-color) inline-block px-3.5 py-7 rounded-[10px] border-(--primary-color) text-[15px] font-semibold text-[#FFF] border-2 hover:bg-(--primary-hover) hover:border-(--primary-hover) hover:-translate-y-0.5"
                    onClick={() => navegar(-1)}
                >
                    Voltar para Página Anterior
                </button>
                {Options.map((item) => {
                    const verify = !item.cargos || item.cargos.includes(Cargo)
                    
                    if (Logado === item.logado && verify) {
                        return (
                            <button
                                key={item.pagina}
                                className="inline-block px-3.5 py-7 rounded-[10px] bg-(--border-color) text-[15px] text-(--text-primary) font-semibold border-2 hover:bg-(--bg-input) hover:border-(--text-secondary) hover:-translate-y-0.5"
                                onClick={() => navegar(item.pagina)}
                            >
                                {item.mensagem}
                            </button>
                        )
                    }
                })}
            </div>

        </FundoBolhas>
    )
}

export default SemAcesso;
