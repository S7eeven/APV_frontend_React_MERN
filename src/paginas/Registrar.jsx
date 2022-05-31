import { useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'

const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    //TODO: VALIDACION DE LOS CAMPOS.
    const handleSubmit =  async (e) => {
        e.preventDefault(); //para prevenir la accion por defecto.
        
        //includes() => para tener acceso al metodo del array
        if([nombre, email, password, confirmarPassword].includes('')){
            setAlerta({ msg: 'hay campos vacios.', error: true });
            return; //este return evita que se siga ejecutando el codigo
        } 
        
        if(password !== confirmarPassword){
            setAlerta({ msg: 'los password no son iguales', error: true });
            return
        }

        if(password.length < 6 ){
            setAlerta({ msg: 'password es muy corto, agregar minimo 6 caracteres.', error: true });
            return
        }

        setAlerta({}) //para restableceer el formualrio cuando no se halla echo ninguna accion.
        // TODO: si todo va bien => PODEMOS CREAR EL USUARIO EN LA API.

        try {
            await clienteAxios.post('/veterinarios', {nombre, email, password} )
            setAlerta({ msg: 'Creado correctamente, revisa tu emial para confirmar cuenta.', error: false})

        } catch (error) {
           setAlerta({
               msg: error.response.data.msg,
               error: true
           })
        }


    }
    const {msg}=alerta

  return (
    <>
        <div className="my-5">
              <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span> </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            
            {/*TODO: este componente nos permitira mostrar las alertas de los campos. Ademas si el form tiele algo muestra la alerta*/}
            { msg && <Alerta 
                alerta={alerta} //TODO:pasamos vias props info de un compoenente a otro.
                />
            }
            
            <form
                onSubmit={handleSubmit}
            >
                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold" >Nombre</label>
                    <input type='text' placeholder="Tu nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre}  onChange={e => setNombre(e.target.value)} /*guarda lo que el usuario escribe.*/ />
                </div>

                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold" >Email</label>
                    <input type='email' placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"  value={email} onChange={e=> setEmail(e.target.value)} />
                </div>

                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold" >Password</label>
                    <input type='password' placeholder="Tu password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password}  onChange={e => setPassword(e.target.value)} />
                </div>

                <div>
                    <label className="uppercase text-gray-600 block text-xl font-bold" >Confirma tu password</label>
                    <input type='password' placeholder="Confirma tu password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)}  />
                </div>

                <input type='submit' value='Crear Cuenta' className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md-w-auto"/>

            </form>
              <nav className='mt-10 lg:flex lg:justify-between '>
                  <Link className="block text-center my-5 text-gray-500" to="/">Ya tienes una cuenta? Inicia Sesion </Link>
                  <Link className="block text-center my-5 text-gray-500" to='/olvidePassword'>Olvide mi Password</Link>
              </nav>
        </div>
    </>
  )
}

export default Registrar