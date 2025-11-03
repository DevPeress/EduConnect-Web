import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Options } from "../../utils/paginação";

const Inicial = ({ Logado, Cargo }: { Logado: boolean, Cargo: string }) => {
    const navegar = useNavigate();

    useEffect(() => {
        if (!Logado) {
            navegar("/login");
            return;
        }

        const opcao = Options.find(option => option.cargos?.includes(Cargo));
        navegar(opcao ? opcao.pagina : "/not-authorized");
    }, [Logado, Cargo, navegar])

    return null;
}

export default Inicial;
