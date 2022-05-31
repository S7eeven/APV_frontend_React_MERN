import axios from 'axios'

//VA A CREAR UNA URL BASE para evitar escribir toda la URL y hacerla mas corta
const clienteAxios =axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteAxios