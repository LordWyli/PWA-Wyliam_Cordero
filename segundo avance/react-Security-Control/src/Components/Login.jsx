
import axios from 'axios';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

export default function Login()

{

  const [getUsuario, setUsuario] = useState('');
  const [getContra, setContra] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectToAdmin, setRedirectToAdmin] = useState(false); // Estado para la redirección
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(getUsuario, getContra)
      const response = await axios.get('http://127.0.0.1:8000/api/login', {
        params: {
          id_usuario: getUsuario,
          clave_acceso: getContra
        }
      });
      console.log('Respuesta de la API:', response.data.user.id_rol);
      console.log(response)
      if (response != null) {
        localStorage.setItem('token', JSON.stringify(response.data));
        if (response.data.user.id_rol == 10)
        {
          navigate('/administradorbd');
        }
        else if (response.data.user.id_rol == 1){
          navigate('/administrador');
          //setRedirectToAdmin(true);
        }
        else{
          setError('Usuario no administrador.');
        }
        //
      } else {
        setError('Credenciales incorrectas. Inténtalo nuevamente.');
      }


      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Credenciales incorrectas. Inténtalo nuevamente.'); // O algún mensaje de error apropiado
    }
  };


   // Si redirectToAdmin es true, redirecciona a la página de administrador
   if (redirectToAdmin) {
    return <Navigate to="/administradorBD" replace={true} />;

  }
    return (
        <section className="min-h-screen flex items-center justify-center bg-cover" style={{ backgroundImage: "linear-gradient(rgb(27 25 49 / 50%), rgb(0 0 0 / 50%)), url('../../public/img-contenedor-login.png')" }}>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6 text-center">SecurityControl Login</h2>
            <div className="mb-4">
              <label htmlFor="usuario" className="block font-semibold text-sm mb-1 " >Nombre de Usuario</label>
              <input id="usuario" type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Ingresa tu usuario" value={getUsuario} onChange={(e) => setUsuario(e.target.value)} />
            </div>
            <div className="mb-6">
              <label htmlFor="contra" className="block font-semibold text-sm mb-1">Contraseña</label>
              <input id="contra" type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="Ingresa tu contraseña" value={getContra} onChange={(e) => setContra(e.target.value)} />
            </div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-blue-500 cursor-pointer">Recuperar contraseña?</p>
              <p className="text-sm text-blue-500 cursor-pointer">Click aquí</p>
            </div>
            <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300">Ingresar</button>
            {loading && <p className="mt-4 text-sm text-gray-600">Cargando...</p>}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          </div>
        </section>
      );
}