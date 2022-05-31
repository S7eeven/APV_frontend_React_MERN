import { useState,useEffect } from "react"
import Alerta from './Alerta'
import usePacientes from "../hooks/usePacientes"

const Formulario = () => {
  //deben estar con el mismo nombre que esta en el modelo.
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({})

  const {guardarPaciente, paciente} = usePacientes()
  //console.log(paciente)
  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  }, [paciente])

  const handleSubmit = (e) => {
    e.preventDefault()

    //VALIDAR EL FORMULARIO
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    //EN CASO DE QUE PASE LA VALIDACION
    guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
    setAlerta({
      msg: 'Guardado correctamente.'
    })
    //reseteamos los useState para que cuando editemos no se queden los datos en los input
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')
  }

  const {msg} = alerta

  return (
    <>
      <p className="text-lg text-center mb-10">
        Agrega a tus pacientes y {' '} <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      {/*TODO: EL htmlfor es igual al for con la diferencia que al precionar el label el htmlfor activa el input */}
      <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md " 
        onSubmit={handleSubmit}
      >
        <div className="mb-5" >
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold" >Nombre Mascota</label>
          <input id="nombre" type='text' placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre} onChange={e => setNombre(e.target.value)}
          ></input>
        </div>

        <div className="mb-5" >
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold" >Nombre del propietario</label>
          <input id="propietario" type='text' placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={propietario} onChange={e=>setPropietario(e.target.value)}
          ></input>
        </div>

        <div className="mb-5" >
          <label htmlFor="email" className="text-gray-700 uppercase font-bold" >Tu email</label>
          <input id="email" type='email' placeholder="tu email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email} onChange={e=>setEmail(e.target.value)}
          ></input>
        </div>

        <div className="mb-5" >
          <label htmlFor="fecha" className="text-gray-700 uppercase font-bold" >Fecha de alta</label>
          <input id="fecha" type='date' className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fecha} onChange={e=>setFecha(e.target.value)}
          ></input>
        </div>

        <div className="mb-5" >
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold" >Sintomas de la mascota</label>
          <textarea id="sintomas" placeholder="Escribe aqui los sintomas." className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas} onChange={e=>setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors " value={ id ? "Guardar Cambios" : "Agregar Paciente"} />
    
      </form>
      {msg && <Alerta alerta={alerta} />}

    </>
  )
}

export default Formulario