import { useNavigate } from "react-router-dom"
import FundoBolhas from "../../components/FundoBolhas";

const NaoEncontrada = () => {
    const navegar = useNavigate();

    return (
        <FundoBolhas>
            <div className="text-[60px] md:text-[80px] mb-4 animate-float">🔍</div>
            <h1 className="bg-linear-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent text-[80px] md:text-[120px] font-extrabold leading-none mb-4 animate-glow">404</h1>
            <h1 className="text-(--text-primary) text-[24px] md:text-[32px] font-bold mb-4">Página Não Encontrada</h1>
            <p className="text-(--text-secondary) text-[15px] md:text-[16px] leading-normal mb-8">
                Desculpe, a página que você está procurando não existe ou foi movida.
            </p>

            <div className="flex gap-3 md:gap-4 justify-center mb-10 flex-col md:flex-row">
                <button
                    className="bg-(--primary-color) inline-block px-3.5 py-7 rounded-[10px] border-(--primary-color) text-[15px] font-semibold text-[#FFF] border-2 hover:bg-(--primary-hover) hover:border-(--primary-hover) hover:-translate-y-0.5"
                    onClick={() => navegar(-1)}
                >
                    Voltar para Página Anterior
                </button>
                <button
                    className="inline-block px-3.5 py-7 rounded-[10px] bg-(--border-color) text-[15px] text-(--text-primary) font-semibold border-2 hover:bg-(--bg-input) hover:border-(--text-secondary) hover:-translate-y-0.5"
                    onClick={() => navegar("/inicio")}
                >
                    Ir para o DashBoard
                </button>
            </div>

            <div className="bg-(--bg-input) border border-(--border-color) rounded-xl p-6 text-left">
                <p className="text-[15px] font-semibold text-(--text-primary) mb-3">Sugestões:</p>
                <ul className="list-none p-0">
                    <li className="text-[14px] text-(--text-primary) px-2 py-0 pl-6 relative"><span className="text-(--primary-color) font-semibold">→</span> Verifique se o endereço foi digitado corretamente</li>
                    <li className="text-[14px] text-(--text-primary) px-2 py-0 pl-6 relative"><span className="text-(--primary-color) font-semibold">→</span> Use a barra de busca para encontrar o que precisa</li>
                    <li className="text-[14px] text-(--text-primary) px-2 py-0 pl-6 relative"><span className="text-(--primary-color) font-semibold">→</span> Volte à página anterior e tente novamente</li>
                </ul>
            </div>
        </FundoBolhas>
    )
}

export default NaoEncontrada;
