import { useState, type ReactNode } from "react";
import {
  TituloContext,
} from "../../components/TypeContext";
import { BoletimContext } from "./BoletimContext";

export function BoletimProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(false);
  const [registro, setRegistro] = useState<string>("");

  const [resolveCallback, setResolveCallback] = useState<
    ((data: string | null) => void) | null
  >(null);

  const openMenu = async (): Promise<string | null> => {
    setMenu(true);

    return new Promise<string | null>((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const Confirm = async () => {
    if (resolveCallback) {
      resolveCallback(registro);
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
    <BoletimContext.Provider value={{ openMenu }}>
      {children}
      {menu && (
        <div className="flex fixed top-0 bottom-0 right-0 left-0 bg-[#000000B3] backdrop-blur-sm z-10 animate-fadeIn items-center justify-center p-5">
          <div
            className="bg-(--bg-card) border border-(--border-color) rounded-2xl w-full max-w-175 max-h-[90vh] overflow-hidden amimate-slideUp flex flex-col"
            style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
          >
            <TituloContext titulo="Baixar Boletim" cancelar={Cancel} />

            <div className="grid grid-cols-1 gap-5 mb-5">
              <div className="flex flex-col gap-2">
                <label
                  className="text-[14px] font-semibold text-(--text-primary)"
                  htmlFor={"Registro"}
                >
                  Registro <span className="text-(--red) ml-0.5">*</span>
                </label>
                <input
                  value={registro}
                  onChange={(e) => setRegistro(e.target.value)}
                  type={"text"}
                  className="w-full py-3 px-4 bg-(--bg-input) border-2 border-(--border-color) rounded-[10px] text-(--text-primary) text-[14px] focus:outline-none focus:border-(--primary-color)"
                  placeholder={"Digite o Registro"}
                  required
                />
              </div>
            </div>

            <div className="py-5 px-7 border-t border-(--border-color) flex justify-end gap-3 bg-[#0000001A]">
              <button
                onClick={Cancel}
                type="button"
                className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-transparent text-(--text-secondary) border border-(--border-color) hover:bg-(--alert-color) hover:text-(--text-secondary)"
              >
                Cancelar
              </button>
              <button
                onClick={Confirm}
                type="submit"
                className="py-3 px-6 rounded-[10px] text-[14px] font-semibold cursor-pointer border-none flex items-center gap-2 bg-(--primary-color) text-white border border-(--primary-color) hover:bg-(--primary-hover) -translate-y-0.5"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Baixar Boletim
              </button>
            </div>
          </div>
        </div>
      )}
    </BoletimContext.Provider>
  );
}