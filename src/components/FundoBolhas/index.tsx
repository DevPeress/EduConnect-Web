import type { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";
import Dia from "../../assets/Dia.svg";
import Noite from "../../assets/Noite.svg";

const FundoBolhas = ({ children }: { children: ReactNode }) => {
  const tema = useTheme();
  const dark = tema.dark;

  return (
    <div className="flex relative bg-linear-(--bg-liner) min-h-screen items-center justify-center leading-[1.6] text-(--text-primary) overflow-hidden select-none">
      <div className="relative w-full max-w-[600px] p-7 z-20">
        <div
          className="bg-(--bg-card) border border-(--border-color) rounded-[20px] py-10 md:py-14 px-6 md:px-12 text-center animate-fadeInUp"
          style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="ml-55 md:ml-100 max-w-15">
            {dark ? (
              <img src={Dia} alt="" onClick={() => tema.toggleTheme()} />
            ) : (
              <img src={Noite} alt="" onClick={() => tema.toggleTheme()} />
            )}
          </div>
          {children}
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[300px] h-[300px] bg-(--primary-color) -top-[150px] -right-[150px]"></div>
        <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[400px] h-[400px] bg-(--text-primary) -bottom-[200px] -left-[200px]"></div>
        <div className="absolute rounded-[50%] opacity-[.1] animate-pulse w-[200px] h-[200px] bg-(--primary-color) top-[50%] right-[10%]"></div>
      </div>
    </div>
  );
};

export default FundoBolhas;
