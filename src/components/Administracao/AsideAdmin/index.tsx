import SidebarFooter from "../../SideBar-Footer";
import NavBarAdmin from "../NavBar/NavBarAdmin";
import Logo from "../../../../public/Logo.svg";

const AsideAdmin = () => {
  return (
    <aside className="flex flex-col fixed h-full w-72 bg-(--bg-sidebar) border-r-2 border-(--border-color)">
      <div className="px-6 py-6 border-b-2 border-(--border-color)">
        <div className="flex items-center gap-3 text-[18px] font-bold text-(--text-primary)">
          <img className="w-5" src={Logo} alt="" />
          <span>EduManager</span>
        </div>
      </div>

      <NavBarAdmin />
      <SidebarFooter />
    </aside>
  );
};

export default AsideAdmin;
