import NavBarAdmin from "../../../components/Administracao/navBar/NavBar";
import SidebarFooter from "../../../components/SideBar-Footer";

const InicioAdm = () => {
  return (
    <div className="flex min-h-full">
      <aside className="flex flex-col fixed h-screen w-72 bg-(--bg-sidebar) border-r-2 border-(--border-color) overflow-y-auto">
        <div className="px-6 py-6 border-b-2 border-(--border-color)">
          <div className="flex items-center gap-3 text-[18px] font-bold text-(--text-primary)">
            <span>EduManager</span>
          </div>
        </div>

        <NavBarAdmin />
        <SidebarFooter />
      </aside>
    </div>
  );
};

export default InicioAdm;
