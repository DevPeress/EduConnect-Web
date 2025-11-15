import Dia from "../../assets/Dia.svg";
import Noite from "../../assets/Noite.svg";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const tema = useTheme();
  const dark = tema.dark;
  const auth = useAuth();
  const cargo = auth.cargo;

  return (
    <header className="bg-(--bg-sidebar) border-b-2 border-(--border-color) px-9.5 h-19.25 flex justify-between items-center sticky top-0 z-10">
      <div></div>
      <div className="flex items-center gap-4">
        <button className="relative bg-transparent border-none text-(--text-secondary) cursor-pointer p-2 rounded-[10px] hover:bg-(--bg-hover) hover:text-(--text-primary)">
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
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="absolute top-1 right-1 bg-(--red) text-white text-[10px] font-bold px-1 py-[5px] rounded-lg leading-1">
            3
          </span>
        </button>

        <button className="relative bg-transparent border-none text-(--text-secondary) cursor-pointer p-2 rounded-[10px] hover:bg-(--bg-hover) hover:text-(--text-primary)">
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
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <div className="flex items-center gap-3 cursor-pointer rounded-[10px] pt-1.5 pr-3 pb-1.5 pl-1.5 hover:bg-(--bg-hover)">
          <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="User"
            className="w-10 h-10 rounded-[50%] object-cover border-2 border-(--border-color)"
          />
          <div className="flex flex-col leading-3.5">
            <span className="text-[14px] font-semibold text-(--text-primary)">
              Maria Gonçalves
            </span>
            <span className="text-[12px] text-(--text-muted)">
              {cargo}
            </span>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div className="max-w-15">
          {dark ? (
            <img src={Noite} alt="" onClick={() => tema.toggleTheme()} />
          ) : (
            <img src={Dia} alt="" onClick={() => tema.toggleTheme()} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
