import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  //console.log(params) //nos va amostar el id= token
  const { id } = params

  //para que se ejecute una sola vez
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`
        const { data } = await clienteAxios(url)
        //console.log(data)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        //console.log(error.respose)
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    }
    confirmarCuenta();
  }, [])
  


  return (
    <>
      <div className="my-5">
        <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Administra tus <span className="text-black">Pacientes</span> </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && 
          <Alerta 
          alerta={alerta}
          />
        }

        {cuentaConfirmada && (
          <Link
            className='block text-center my-5 text-gary-500'
            to="/"> Iniciar Sesion</Link>
        ) }


      </div>
    </>
  )
}

export default ConfirmarCuenta