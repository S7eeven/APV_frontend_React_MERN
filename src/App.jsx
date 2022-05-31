import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './paginas/Login'
import OlvidePassword from './paginas/OlvidePassword'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  return (

   //TODO: #1 DEFINIENDO LAS RUTAS PUBLICAS....
    //El elemets={} va ahacer la pagina principal, cuando el user visite / va a llamar al componete AutLayout 
    <BrowserRouter>
      <AuthProvider> {/*este viene de componente AuthProvider */}
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} /> {/*con el index le indicamos que va hacer la pagina principal */}
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvidePassword' element={<OlvidePassword />} />
              <Route path='olvidePassword/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            {/* TODO: RUTAS PRIVADAS */}
            <Route path='/admin' element={ <RutaProtegida /> } >
              <Route index element={<AdministrarPacientes/>} />
              <Route path='perfil' element={<EditarPerfil/>} />
              <Route path='cambiar-password' element={<CambiarPassword/>} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
