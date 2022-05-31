import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

//useContxte es para hacer disponible los valores del provider del archivo AuthProvider
const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes