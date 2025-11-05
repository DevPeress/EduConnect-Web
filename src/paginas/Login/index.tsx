import { useState, type FormEvent } from "react";
import type { LoginProps, LoginResponse, LoginType } from "../../types/types";
import FundoBolhas from "../../components/FundoBolhas";
import { http } from "../../utils/axios";

const Login = ({ TrocarInfos }: LoginProps) => {
  const [dados, setDados] = useState<LoginType>({ email: "", senha: "" });
  const [menu, setMenu] = useState<boolean>(false);

  const AlterarDados = (texto: string, tipo: keyof LoginType) => {
    setDados((prevDados) => ({
      ...prevDados,
      [tipo]: texto,
    }));
  };

  const Login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = dados.email;
    const senha = dados.senha;
    const verificarEmail = email.includes("@") && email.includes(".com");
    if (!verificarEmail) return alert("E-mail ou senha estão incorretos");

    // FETCH
    await http
      .post<LoginResponse>("/login", {
        email,
        senha,
      })
      .then(function (response) {
        TrocarInfos(response.data.cargo, response.data.token);
      })
      .then(function (error) {
        console.log(error);
      });
  };

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
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="w-full px-3 py-4 border-2 border-(--border-color) rounded-lg text-[15px] text-(--text-primary) bg-(--bg-input) focus:outline-none focus:border-(--primary-color)"
            value={dados.email}
            onChange={(e) => AlterarDados(e.target.value, "email")}
            type="email"
            name="email"
            id="email"
            placeholder="seu@gmail.com"
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
              className="w-full px-3 py-4 border-2 border-(--border-color) rounded-lg text-[15px] text-(--text-primary) bg-(--bg-input)  focus:outline-none focus:border-(--primary-color)"
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
