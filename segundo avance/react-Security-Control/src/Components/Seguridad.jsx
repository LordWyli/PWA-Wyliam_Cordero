import { useState, useEffect } from 'react'

const listaUsuarios =
 
     [
        {id: 1, 'nombre':  'Luis Roberto Roque Vargas', 'puesto': 'Tecnico', 'area': 'Calidad'},
        {id: 2,'nombre':  'Dana Lizett Colores Juarez', 'puesto': 'Ingeniero', 'area': 'Quimicos'},
        {id: 3,'nombre':  'Manuel Camacho Vargas', 'puesto': 'Tecnico', 'area': 'Almacen'},
        {id: 4,'nombre':  'Lorena Vargas Hernandez', 'puesto': 'Tecnico', 'area': 'Quimicos'},
        {id: 5,'nombre':  'Manuel Camacho Vargas', 'puesto': 'Tecnico', 'area': 'Calidad'}
    ]


const Seguridad = ({listaHabitaciones}) => {

  const [cantidadValues, setCantidadValues] = useState({
    calidad: 5,
    quimicos: 4,
    almacen: 2,
  });

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };
  useEffect(() => {
    // Generar nuevos valores aleatorios para cantidad y actualizar el estado cada 5 minutos
    const interval = setInterval(() => {
      setCantidadValues({
        calidad: generateRandomNumber(),
        quimicos: generateRandomNumber(),
        almacen: generateRandomNumber(),
      });
    }, 5 * 60 * 1000); // 5 minutos en milisegundos

    return () => clearInterval(interval);
  }, []); // El s

  if (!listaHabitaciones) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras listaHabitaciones se está obteniendo
  }
  
  const sensoresPorArea = {};
  listaHabitaciones.forEach((sensor) => {
    if (!sensoresPorArea[sensor.id_area]) {
      sensoresPorArea[sensor.id_area] = [];
    }
    sensoresPorArea[sensor.id_area].push(sensor);
  });

  return (
    <>
        <div className='flex w-full'>
    <div className='w-7/12 h-24 flex flex-wrap'>
      <div className='w-full md:w-1/3 mb-4'>
        <div className='p-3 bg-white rounded-lg flex items-center justify-around text-lg shadow-xl mr-10'>
          <div className='bg-sky-600 w-14 h-14 rounded-full flex items-center justify-center'>
            <i className="fa-solid fa-building-wheat text-white"></i>
          </div>
          <div>
            <h4>Calidad</h4>
            <span className='text-sm text-sky-600'>Cantidad: {cantidadValues.calidad}</span>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/3 mb-4'>
        <div className='p-3 bg-white rounded-lg flex items-center justify-around text-lg shadow-xl mr-10'>
          <div className='bg-green-600 w-14 h-14 rounded-full flex items-center justify-center'>
            <i className="fa-solid fa-biohazard text-white"></i>
          </div>
          <div>
            <h4>Químicos</h4>
            <span className='text-sm text-green-600'>Cantidad: {cantidadValues.quimicos}</span>
          </div>
        </div>
      </div>
      <div className='w-full md:w-1/3 mb-4'>
        <div className='p-3 bg-white rounded-lg flex items-center justify-around text-lg shadow-xl mr-10'>
          <div className='bg-red-600 w-14 h-14 rounded-full flex items-center justify-center'>
            <i className="fa-solid fa-box-open text-white"></i>
          </div>
          <div>
            <h4>Almacén</h4>
            <span className='text-sm text-red-600'>Cantidad: {cantidadValues.almacen}</span>
          </div>
        </div>
      </div>
      <div className='flex w-full'>
      {/* Resto del contenido */}
      <div className='w-full mr-8 p-5 bg-white rounded-lg flex flex-col items-center justify-center text-sm shadow-xl'>
        {Object.entries(sensoresPorArea).map(([idArea, sensoresArea]) => (
          <div key={idArea} className='flex flex-wrap justify-around mb-4'>
            <p className='font-bold mt-4'>ID del área: {idArea}</p>
            <div className='flex flex-wrap justify-center'>
              {sensoresArea.map((sensor) => (
                <div key={sensor.id_sensor} className='w-full m-1 md:w-1/4 mb-4 flex-3'>
                  <div
                    className={`p-3 rounded-lg flex items-center justify-around text-sm shadow-xl ${
                      sensor.estado === 1 ? ' bg-rose-700 text-white' : 'bg-gray-300 text-black'
                    }`}
                  >
                    <div className='text-center'>
                      <h4>{sensor.descripcion}</h4>
                      <span className='text-xs'>
                        {sensor.estado === 1 ? 'True' : 'False'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
       <div className='w-5/12 h-150 bg-white rounded-lg shadow-xl text-lg p-5'>
        <h4 className='mb-4'>Lista de usuarios en habitaciones</h4>
        <div className=' w-full text-xs flex h-9 mr-4 mb-4'>
          <input type="text" placeholder='Buscando...' className='rounded-lg w-full px-4 py-2 bg-gray-200 shadow-2xl focus:outline-cyan-800'/>
          <button className='rounded-lg bg-cyan-600 px-3 flex items-center mx-2 text-white transition-colors hover:bg-cyan-800'>
            <i className="fa-solid fa-magnifying-glass m-2"></i>
            <span>Buscar</span>
          </button>
          <select className='w-8/12 bg-gray-200 px-6 py-2 rounded-lg'>
            <option value="">Opcion 1</option>
            <option value="">Opcion 2</option>
            <option value="">Opcion 3</option>
          </select>
        </div>
        {listaUsuarios.map( data =>
          <div key={data.id} className='w-full bg-gray-100 flex rounded-md py-4 px-4 text-sm mb-2'>
            <p className=' w-2/4'>{data.nombre}</p>
            <p className='w-1/4'>{data.puesto}</p>
            <p className='w-1/4'>{data.area}</p>
          </div>
          
        )
        }
        
      </div>
    </div>
       
    </>
  )
}

export default Seguridad