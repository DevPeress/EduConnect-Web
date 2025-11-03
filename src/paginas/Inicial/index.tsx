import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const Inicial = () => {
    const navegar = useNavigate();
    const auth = useAuth();
    const token = auth.token;
    
    useEffect(() => {
        navegar(token ? "/incio" : "/login")
    }, [navegar, token])

    return null
}

export default Inicial;
