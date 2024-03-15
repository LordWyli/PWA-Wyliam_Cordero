import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Seguridad from './Components/Seguridad.jsx'
import Dashboard from './Components/Dashboard.jsx'
import LandingPage from './Components/LandingPage.jsx'
import Login from './Components/Login.jsx'

function MainComponent() {
  const [listaHabitaciones, setListaHabitaciones] = useState(null);
  const [listaRegistros, setListaRegistros] = useState(null);
  // Obtenemos la lista de habitaciones antes de renderizar el componente App
  // ...

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/Login',
      element: <Login />,
    },
    {
      path: '/Administrador', // Ruta padre
      element: <App setListaHabitaciones={setListaHabitaciones} listaHabitaciones={listaHabitaciones} />, // Pasamos listaHabitaciones como prop al componente App
      children: [
        {
          path: '', // Ruta vacía para hacer referencia a la ruta padre '/Administrador'
          element: <Seguridad listaHabitaciones={listaHabitaciones} />, // Pasamos listaHabitaciones como prop al componente Seguridad
        },
        {
          path: 'Dashboard',
          element: <Dashboard setListaRegistros={setListaRegistros} listaRegistros={listaRegistros}/>,
        } 
       
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainComponent />);