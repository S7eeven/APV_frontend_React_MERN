import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    //CUANDO CARGE EL COMPONENETE O LA API
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config)
                //console.log(data) //muestra en un array todos los pacientes q tenga ese usuario
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                //VAMOS A ACTUALIZAR EL OBJE PARA QUE SE ACTUALICEN AUTOMATICAMENTE LAS CITAS
                const pacienteActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )
                setPacientes(pacienteActualizado);
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                //console.log(data);
                //me va a crear un nuevo obj con lo que no tengo aki.
                const {createAt, updateAT, __v, ...pacienteAlmacenado} = data
                //console.log(pacienteAlmacenado);
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = (paciente) => {
        //console.log('editando', id)
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('Confirma que deseas eliminar ?')
        //console.log(confirmar); //nos devolvera un trueo false
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id )
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {/*TODOS LOS COMPONENTES HIJOS */}
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;