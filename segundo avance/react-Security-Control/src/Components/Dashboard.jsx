import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import GraficaTiempo from './GraficaTiempo';

const Dashboard = ({setListaRegistros, listaRegistros}) => {
  const [incidentes, setIncidentes] = useState([]);
  const [tendencias, setTendencias] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));

        if (!token) {
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/accesos', {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (response.data) {
          setListaRegistros(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // Llamada a la función fetchData solo una vez al montar el componente
    fetchData();
  }, []); // El array vacío asegura que este useEffect se ejecute solo una vez al montar el componente

  if (!listaRegistros) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras listaHabitaciones se está obteniendo
  }
  const arrayRegistros = Object.values(listaRegistros);

  const arreglo = arrayRegistros.filter(item => item.resultado == 0);
 
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const registrosPorDiaSemana = {
  Domingo: 0,
  Lunes: 0,
  Martes: 0,
  Miércoles: 0,
  Jueves: 0,
  Viernes: 0,
  Sábado: 0
};

arreglo.forEach(item => {
  const fecha = new Date(item.fecha_hora);
  const diaSemana = fecha.getDay();
  const nombreDiaSemana = diasSemana[diaSemana];

  // Incrementar el contador para ese día de la semana
  registrosPorDiaSemana[nombreDiaSemana]++;
});
  //console.log(registrosPorDiaSemana);




  const informacionGrafica1 = [
    {
      name: 'sales',
      data: [
        { x: 'Domingo', y: registrosPorDiaSemana.Domingo },
        { x: 'Lunes', y: registrosPorDiaSemana.Lunes },
        { x: 'Martes', y: registrosPorDiaSemana.Martes },
        { x: 'Miercoles', y: registrosPorDiaSemana.Miércoles },
        { x: 'Jueves', y: registrosPorDiaSemana.Jueves },
        { x: 'Viernes', y: registrosPorDiaSemana.Viernes },
        { x: 'Sabado', y: registrosPorDiaSemana.Sábado }
      ]
    }
  ];

  const opcionesGrafica1 = {
    chart: {
      type: 'bar',
      height: 300
    },
    xaxis: {
      type: 'category',
      categories: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'], 
      labels: {
        formatter: function(val) {
          return val;
        }
      }
    },
    title: {
      text: 'Intrucciones por semana'
    },
    tooltip: {
      x: {
        formatter: function(val) {
          return val; 
        }
      }
    }
  };

  const opcionesGrafica2 = {
    series: [70],
    options: {
      chart: {
        height: 300,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          }
        },
      },stroke: {
        lineCap: 'round'
      },
      title: {
        text: 'Eficiencia de empleados'
      },
      labels: ['Eficiencia'],
    },
    
  }

  const opcionesGrafica3 = {
    series: [{
        data: [30, 40, 20]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Taza de intrucion por areas'
        },
        xaxis: {
          categories: ['Calidad', 'Quimica', 'Almacen', 'IT', 'Recursos Humanos'
          ],
        }
      },
  }


  return (
    <>
    <div className='flex'>
        <div id="chart" className='w-3/12 bg-white rounded-lg text-lg shadow-xl mr-10 '>
            <ReactApexChart options={opcionesGrafica1} series={informacionGrafica1} type="bar" height={300} />
        </div>
        <div id="chart" className='w-3/12 flex justify-center items-center bg-white rounded-lg text-lg shadow-xl mr-10 '>
            <ReactApexChart options={opcionesGrafica2.options} series={opcionesGrafica2.series} type="radialBar" height={300} />
        </div>
        <div id="chart" className='w-6/12 bg-white rounded-lg text-lg shadow-xl mr-10 '>
            <ReactApexChart options={opcionesGrafica3.options} series={opcionesGrafica3.series} type="bar" height={300} />
        </div>
    </div>
            <GraficaTiempo setTendencias={setTendencias} arreglo={arreglo} tendencias={tendencias} />
            </>
  );
}

export default Dashboard;
