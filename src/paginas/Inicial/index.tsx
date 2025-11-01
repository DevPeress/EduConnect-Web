import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Inicial = () => {
    const navegar = useNavigate()
    
    useEffect(() => {
        const token = false;
        navegar(token ? "/incio" : "/login")
    }, [navegar])

    return null
}

export default Inicial;
