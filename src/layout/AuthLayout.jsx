import { Outlet } from 'react-router-dom' //importante para el TODO: #3 login

const AuthLayout = () => {
    //TODO: #2 Layaout PRINCIPAL
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center ">
        <Outlet /> {/*ES COMO UN ESPACIO RESERVADO PARA EL COMPONETE LOGIN,Le estamos indicando que carge el componete login dentro de AuthLayout principal, y este dentro de App*/}
      </main>

    </>
  )
}

export default AuthLayout