import { useEffect, useState, type FormEvent } from "react";
import type { AuthPaginas } from "../../types/types";
import FundoBolhas from "../../components/FundoBolhas";
import { http } from "../../utils/axios";
import toast from "react-hot-toast";
import { loginSchema, type LoginInput } from "../../schemas/loginSchema";
import { useNavigate } from "react-router-dom";
import { Options } from "../../utils/paginação";
import { useAuth } from "../../context/AuthContext";

const Login = ({ logado, cargo }: AuthPaginas) => {
  const navegar = useNavigate();
  const auth = useAuth();

  const [dados, setDados] = useState<LoginInput>({ registro: "", senha: "" });
  const [menu, setMenu] = useState<boolean>(false);

  const AlterarDados = (texto: string, tipo: keyof LoginInput) => {
    setDados((prevDados) => ({
      ...prevDados,
      [tipo]: texto,
    }));
  };

  const Login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registro = dados.registro;
    const senha = dados.senha;
    const result = loginSchema.safeParse(dados);
    if (!result.success) return toast.error(result.error.issues[0].message);

    const loginPromise = http.post("/api/auth/login", {
      Registro: registro,
      Senha: senha,
      Lembrar: true,
    });
    await toast.promise(
      loginPromise,
      {
        loading: "Entrando...",
        success: (data) => {
          const opcao = Options.find((option) =>
            option.cargos?.includes(data.data)
          );

          auth.AtualizarAuth();
          
          setTimeout(() => {
            navegar(opcao ? opcao.pagina : "/not-authorized");
          }, 3000);

          return "Login realizado com sucesso!";
        },
        error: (err) => {
          if (typeof err === "number") {
            return `Você tem mais ${err} tentativas de login!`;
          }

          return "E-mail ou senha estão incorretos!";
        },
      },
      {
        success: {
          duration: 4000,
        },
        error: {
          duration: 6000,
        },
      }
    );
  };

  useEffect(() => {
    const executar = async () => {
      if (logado) {
        const pagina = Options.find((item) => item.cargos?.includes(cargo));
        if (pagina) navegar(pagina.pagina);
      }
    };

    executar();
  }, [cargo, logado, navegar]);

  return (
    <FundoBolhas>
      <h1 className="text-(--text-primary) text-[24px] md:text-[32px] font-bold mb-4">
        Bem-Vindo
      </h1>
      <p className="text-(--text-secondary) text-[15px] md:text-[16px] leading-normal mb-8">
        {menu
          ? "Digite o E-mail para receber o link para a troca de senha"
          : "Faça o login para continuar"}
      </p>

      <form className="flex flex-col gap-5" onSubmit={(e) => Login(e)}>
        <div className="flex flex-col gap-2 text-left">
          <label
            className="text-(--text-primary) text-[14px] font-medium"
            htmlFor="text"
          >
            Registro
          </label>
          <input
            className="w-full px-3 py-4 border-2 border-(--border-color) rounded-lg text-[15px] text-(--text-primary) bg-(--bg-input) focus:outline-none focus:border-(--primary-color)"
            value={dados.registro}
            onChange={(e) => AlterarDados(e.target.value, "registro")}
            type="text"
            name="text"
            id="text"
            placeholder="Seu Registro"
            required
          />
        </div>

        {!menu ? (
          <div className="flex flex-col gap-2 text-left">
            <label
              className="text-(--text-primary) text-[14px] font-medium"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="w-full px-3 py-4 border-2 border-(--border-color) rounded-lg text-[15px] text-(--text-primary) bg-(--bg-input) focus:outline-none focus:border-(--primary-color)"
              value={dados.senha}
              onChange={(e) => AlterarDados(e.target.value, "senha")}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
        ) : null}

        <div className="flex justify-between items-center mt-1">
          <label className="flex items-center gap-8 cursor-pointer text-[12px] md:text-[14px] text-(--text-secondary)">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer accent-(--primary-color)"
            />
            <span className="-ml-4 ">Lembrar de mim</span>
          </label>
          <a
            className="text-(--primary-color) text-[12px] md:text-[14px] font-medium hover:text-(--primary-hover) hover:underline"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Voltar" : "Esqueceu a senha?"}
          </a>
        </div>

        <button
          type="submit"
          className="w-full px-3.5 py-6 bg-(--primary-color) text-white border-none rounded-lg text-[16px] font-semibold cursor-pointer mt-2 hover:bg-(--primary-hover) hover:-translate-y-0.5"
        >
          Entrar
        </button>
      </form>
    </FundoBolhas>
  );
};

export default Login;
