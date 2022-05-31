import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"

import useAuth from "../hooks/useAuth"

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  const {auth, actualizarPerfil} = useAuth()
  //console.log(auth)

  const user = auth.nombre;
  //console.log(user)

  return (
  <> 
    <h2 className=" my-5 p-2 text-center text-2xl uppercase "> <span className="font-bold">Bienvenido:</span> {user}</h2>

    <div className="flex flex-col md:flex-row">
      <button type="button" className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md hover:bg-indigo-800 mb-8 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>


      {/*si el formualrio esta en true muestars estas clases 'block' CASO contrerio estas otras clases 'hidden' */}
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5" >
        <ListadoPacientes />
      </div>
    </div>
  </>
  )
}

export default AdministrarPacientes