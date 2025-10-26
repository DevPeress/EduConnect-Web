import { useNavigate } from "react-router-dom"

const NaoEncontrada = () => {
    const navegar = useNavigate()

    return (
        <div className="flex relative bg-[linear-gradient(135deg,#0f172a_0%,#1e1b4b_100%)] min-h-screen items-center justify-center text-[#f9fafb] leading-[1.6] overflow-hidden select-none">
            <div className="relative w-full max-w-[600px] p-8 z-20">
                <div className="bg-[#1f2937] border-[#374151] border rounded-[20px] py-10 md:py-14 px-6 md:px-12 text-center animate-fadeInUp" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}>
                    <div className="text-[60px] md:text-[80px] mb-4 animate-float">🔍</div>
                    <h1 className="bg-linear-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent text-[80px] md:text-[120px] font-extrabold leading-none mb-4 animate-glow">404</h1>
                    <h1 className="text-[24px] md:text-[32px] font-bold text-[#f9fafb] mb-4">Página Não Encontrada</h1>
                    <p className="text-[15px] md:text-[16px] text-[#9ca3af] leading-normal mb-8"> 
                        Desculpe, a página que você está procurando não existe ou foi movida.
                    </p>

                    <div className="flex gap-3 md:gap-4 justify-center mb-10 flex-col md:flex-row">
                        <button className="inline-block px-3.5 py-7 rounded-[10px] text-[15px] font-semibold bg-[#3b82f6] text-[#FFF] border-2 border-[#3b82f6] hover:bg-[#2563eb] hover:border-[#2563eb] hover:-translate-y-0.5 hover:" onClick={() => navegar(-1)}>Voltar para Página Anterior</button>
                        <button className="inline-block px-3.5 py-7 rounded-[10px] text-[15px] font-semibold text-[#f9fafb] border-2 border-[#374151] hover:bg-[#111827] hover:border-[#9ca3af] hover:-translate-y-0.5" onClick={() => navegar("/inicio")}>Ir para o DashBoard</button>
                    </div>

                    <div className="bg-[#111827] border border-[#374151] rounded-xl p-6 text-left">
                        <p className="text-[15px] font-semibold text-[#f9fafb] mb-3">Sugestões:</p>
                        <ul className="list-none p-0">
                            <li className="text-[14px] text-[#9ca3af] px-2 py-0 pl-6 relative"><span className="text-[#3b82f6] font-semibold">→</span> Verifique se o endereço foi digitado corretamente</li>
                            <li className="text-[14px] text-[#9ca3af] px-2 py-0 pl-6 relative"><span className="text-[#3b82f6] font-semibold">→</span> Use a barra de busca para encontrar o que precisa</li>
                            <li className="text-[14px] text-[#9ca3af] px-2 py-0 pl-6 relative"><span className="text-[#3b82f6] font-semibold">→</span> Volte à página anterior e tente novamente</li>
                        </ul>
                    </div>
                </div>

                <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[300px] h-[300px] bg-[#3b82f6] -top-[150px] -right-[150px]"></div>
                    <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[400px] h-[400px] bg-[#8b5cf6] -bottom-[200px] -left-[200px]"></div>
                    <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[200px] h-[200px] bg-[#3b82f6] top-[50%] right-[10%]"></div>
                </div>
            </div>
        </div>
    )
}

export default NaoEncontrada
