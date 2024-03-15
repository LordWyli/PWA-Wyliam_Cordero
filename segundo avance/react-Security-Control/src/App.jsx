import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';

function App({setListaHabitaciones, listaHabitaciones}) {
const [mostrar, setMostrar] = useState(true);
const [datosUsuario, setDatosUsuarios] = useState(null); // Valor inicial null


const fetchData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    
    if (!token) {
      return;
    }
    setDatosUsuarios(token);
    console.log(token);
    const response = await axios.get('http://127.0.0.1:8000/api/sensores_movimientos', {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      }
    });
    //console.log(response);
    if (response.data) {
      setListaHabitaciones(response.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {

  fetchData(); // Se ejecuta al inicio

  const interval = setInterval(() => {
    fetchData(); // Se ejecuta cada 5 minutos
  }, 2 * 60 * 1000); // 5 minutos en milisegundos

  return () => {
    clearInterval(interval); // Limpia el intervalo al desmontar el componente
  };
}, []);

useEffect(() => {
  //console.log(listaHabitaciones);
}, [listaHabitaciones]);

// Lógica para ejecutar fetchData si datosUsuario es null
useEffect(() => {
  if (datosUsuario === null) {
    fetchData();
  }
}, [datosUsuario]);

  return (
    <div className='flex m-3'>
      <div className={`${mostrar ? 'w-72' : 'w-20'} p-5 pt-8 duration-300 h-screen bg-white rounded-lg relative`}>
        <i className={`${mostrar ? 'fa-solid fa-bars' : 'fa-solid fa-x'} absolute -right-4 top-7 text-sm bg-cyan-600 py-2 px-3 rounded-full text-white cursor-pointer`} onClick={() => setMostrar(!mostrar)}></i>
        <div className='mb-16 flex gap-x-4 items-center'>
          <div className="p-3 h-10 relative bg-cyan-600 text-white rounded-lg">
            <h2 className='relative -top-1/4 font-medium' >SC</h2>
          </div>
          <h2 className={`${!mostrar && 'hidden'} w-30 transition-all duration-500 ease-in-out delay-30 relative text-lg font-semibold `}>
            Security {''} 
            <span className='text-cyan-600'>Control</span>
            </h2>
        </div>
        <ul className=' mb-7'>
        <Link
        to={{
          pathname: '/Administrador'
        }}
        className='text-sm items-center flex gap-x-4 cursor-pointer p-2 rounded-md hover:bg-cyan-800 text-gray-600 hover:text-white'
      >
              <i className="text-2xl mr-6 rounded-sm fa-solid fa-shield"></i>
            <span className={`${!mostrar && 'hidden'} origin-left duration-200 font-medium text-lg`}>Seguridad</span>
          </Link>
        </ul>
        <ul className=' mb-7'>
          <Link to={'/Administrador/Dashboard'} className='text-sm items-center flex gap-x-4 cursor-pointer p-2 rounded-md hover:bg-cyan-800 text-gray-600 hover:text-white'>
            <i className="text-2xl mr-6 rounded-sm  fa-solid fa-chart-column"></i>
            <span className={`${!mostrar && 'hidden'} origin-left duration-200 font-medium text-lg`}>Dashboard</span>
          </Link>
        </ul>
        <ul className=' mb-7'>
          <li className='text-sm items-center flex gap-x-4 cursor-pointer p-2 rounded-md hover:bg-cyan-800 text-gray-600 hover:text-white'>
            <i className="text-2xl mr-6 rounded-sm  fa-solid fa-satellite-dish"></i>
            <span className={`${!mostrar && 'hidden'} origin-left duration-200 font-medium text-lg`}>Sensores</span>
          </li>
        </ul>
        <ul className=' mb-7'>
          <li className='text-sm items-center flex gap-x-4 cursor-pointer p-2 rounded-md hover:bg-cyan-800 text-gray-600 hover:text-white'>
            <i className="text-2xl mr-6 rounded-sm  fa-solid fa-eye"></i>
            <span className={`${!mostrar && 'hidden'} origin-left duration-200 font-medium text-lg`}>Camaras</span>
          </li>
        </ul>
      </div>
      <div className='p-7 text-2xl font-semibold flex-1 h-screen'>
        <div className='flex justify-between mb-10'>
          <h1>Modulo {' '}
            <span className='text-cyan-800'>Seguridad</span>
          </h1>
        <div className='flex items-center'>
          <div className=' w-80 text-xs flex h-9 mr-4'>
              <input type="text" placeholder='Buscando...' className='rounded-lg w-full px-4 py-2 shadow-2xl focus:outline-cyan-800'/>
              <button className='rounded-lg bg-cyan-600 px-3 flex items-center mx-2 text-white transition-colors hover:bg-cyan-800'>
                <i className="fa-solid fa-magnifying-glass m-2"></i>
                <span>Buscar</span>
              </button>
            </div>
            <div className='rounded-full bg-cyan-900 w-10 h-10'>
              
            </div>
          </div>
        </div>
          <Outlet />
        </div>
       
    </div>
  )
}

export default App
