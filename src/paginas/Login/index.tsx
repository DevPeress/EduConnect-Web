import Dia from '../../assets/Dia.svg';
import Noite from '../../assets/Noite.svg';
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
    const tema = useTheme();
    const dark = tema.dark;

    return(
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

                    <h1 className="text-(--text-primary) text-[24px] md:text-[32px] font-bold mb-4">Bem-Vindo</h1>
                    <p className="text-(--text-secondary) text-[15px] md:text-[16px] leading-normal mb-8">
                        Fala o login para continuar
                    </p>

                    <form  className='flex flex-col gap-5' onSubmit={Login} >
                        <div className='flex flex-col gap-2 text-left'>
                            <label className='text-(--text-primary) text-[14px] font-medium' htmlFor="email">E-mail</label>
                            <input 
                                className='w-full px-3 py-4 border-2 border-(--border-color) rounded-lg text-[15px] text-(--text-primary) bg-(--bg-input) focus:outline-none focus:border-(--primary-color)'
                                type="email" name="email" id="email" placeholder='seu@gmail.com' required 
                            />
                        </div>

                        <div className='flex flex-col gap-2 text-left'>
                            <label className='text-(--text-primary) text-[14px] font-medium' htmlFor="password">Senha</label>
                            <input 
                                className='w-full px-3 py-4 border-2 border-(--border-color) rounded-lg text-[15px] text-(--text-primary) bg-(--bg-input)  focus:outline-none focus:border-(--primary-color)'
                                type="password" name="password" id="password" placeholder='••••••••' required 
                            />
                        </div>

                        <div className='flex justify-between items-center mt-1'>
                            <label className="flex items-center gap-8 cursor-pointer text-[14px] text-(--text-secondary)">
                                <input type="checkbox" className='w-4 h-4 cursor-pointer accent-(--primary-color)' />
                                <span >Lembrar de mim</span>
                            </label>
                            <a className='text-(--primary-color) text-[14px] font-medium hover:text-(--primary-hover) hover:underline'>Esqueceu a senha?</a>
                        </div>

                        <button type='submit' className='w-full px-3.5 py-6 bg-(--primary-color) text-white border-none rounded-lg text-[16px] font-semibold cursor-pointer mt-2 hover:bg-(--primary-hover) hover:-translate-y-0.5'>Entrar</button>
                    </form>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[300px] h-[300px] bg-(--primary-color) -top-[150px] -right-[150px]"></div>
                <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[400px] h-[400px] bg-[#8b5cf6] -bottom-[200px] -left-[200px]"></div>
                <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[200px] h-[200px] bg-(--primary-color) top-[50%] right-[10%]"></div>
            </div>
        </div>
    )
}

export default Login;
