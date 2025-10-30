import { useNavigate } from "react-router-dom"
import Dia from '../../assets/Dia.svg';
import Noite from '../../assets/Noite.svg';
import { useTheme } from "../../context/ThemeContext";

const NaoEncontrada = () => {
    const navegar = useNavigate();
    const tema = useTheme();
    const dark = tema.dark;

    return (
        <div className="flex relative bg-linear-(--bg-liner) min-h-screen items-center justify-center leading-[1.6] text-(--text-primary) overflow-hidden select-none">
            <div className="relative w-full max-w-[600px] p-7 z-20">
                <div className="bg-(--bg-card) border border-(--border-color) rounded-[20px] py-10 md:py-14 px-6 md:px-12 text-center animate-fadeInUp" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}>
                    <div className="ml-55 md:ml-100 max-w-15">
                        {dark ?
                            <img src={Dia} alt="" onClick={() => tema.toggleTheme()} />
                            :
                            <img src={Noite} alt="" onClick={() => tema.toggleTheme()} />
                        }
                    </div>

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
                </div>

                <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[300px] h-[300px] bg-(--primary-color) -top-[150px] -right-[150px]"></div>
                    <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[400px] h-[400px] bg-[#8b5cf6] -bottom-[200px] -left-[200px]"></div>
                    <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[200px] h-[200px] bg-(--primary-color) top-[50%] right-[10%]"></div>
                </div>
            </div>
        </div>
    )
}

export default NaoEncontrada;
