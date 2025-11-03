import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { OptionsInicial } from "../../types/types";

const Inicial = ({ Logado, Cargo }: { Logado: boolean, Cargo: string }) => {
    const navegar = useNavigate();

    const Options: OptionsInicial[] = [
        { cargo: ["Admin"], pagina: "/admin" }
    ]
    
    useEffect(() => {
        if (!Logado) {
            navegar("/login");
            return;
        }

        const opcao = Options.find(option => option.cargo.includes(Cargo));
        navegar(opcao ? opcao.pagina : "/not-authorized");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Logado, Cargo, navegar])

    return null;
}

export default Inicial;
