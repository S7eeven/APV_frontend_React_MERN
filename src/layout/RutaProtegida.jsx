import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header';
import Footer from '../components/Footer';

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()
    if(cargando) return 'Cargando....'

  return (
    <>
        <Header />
            {/*TODO: de esta forma protegemos la ruta privada => no permitira accedae al /admin sin aver logeado */}
            {auth?._id ? ( 
              <main className='container mx-auto mt-20'>
                <Outlet />
              </main>
            ): <Navigate to="/" />}
        <Footer />
    </>
  )
};

export default RutaProtegida;