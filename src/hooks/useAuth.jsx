import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//useContxte es para hacer disponible los valores del provider del archivo AuthProvider
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth