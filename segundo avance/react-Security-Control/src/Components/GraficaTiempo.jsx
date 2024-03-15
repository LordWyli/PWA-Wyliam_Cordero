import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const GraficaTiempo = ({setTendencias, arreglo ,tendencias}) => {
const [fecha, setFecha] = useState({});
  useEffect(() => {
    const arrayRegistros = Object.values(arreglo);
    const ubicacionEspecifica = 'Centro de Datos';
    const registrosFiltrados = arrayRegistros.filter(registro => registro.ubicacion === ubicacionEspecifica);
    // Ordenar los registros por ID de usuario y fecha de acceso
    registrosFiltrados.sort((a, b) => {
      if (a.id_usuario !== b.id_usuario) {
        return a.id_usuario - b.id_usuario;
      }
      return new Date(a.fecha_hora) - new Date(b.fecha_hora);
    });
  
    // Crear un mapa de id_usuario a nombre de usuario
    const idToUsernameMap = {};
    arrayRegistros.forEach(registro => {
      idToUsernameMap[registro.id_usuario] = registro.NombreUsuario;
    });
  
    // Calcular la tendencia en el tiempo entre accesos para un usuario específico a una ubicación específica
    const tendenciaTiempoAcceso = {};
  
    for (let i = 1; i < registrosFiltrados.length; i++) {
      const registroActual = registrosFiltrados[i];
      const registroAnterior = registrosFiltrados[i - 1];
  
      if (registroActual.id_usuario === registroAnterior.id_usuario) {
        const tiempoTranscurridoMs = new Date(registroActual.fecha_hora) - new Date(registroAnterior.fecha_hora);
        const tiempoTranscurridoHoras = tiempoTranscurridoMs / 3600000; // Convertir milisegundos a horas
  
        if (!tendenciaTiempoAcceso[registroActual.id_usuario]) {
          tendenciaTiempoAcceso[registroActual.id_usuario] = [];
        }
  
        tendenciaTiempoAcceso[registroActual.id_usuario].push({
          ubicacion: registroActual.ubicacion,
          tiempoTranscurrido: tiempoTranscurridoHoras // Guardar el tiempo en horas en lugar de milisegundos
        });
      }
    }
  
    // Remplazar los IDs de usuario con los nombres de usuario correspondientes en tendenciaTiempoAcceso
    const tendenciaConNombres = {};
    Object.keys(tendenciaTiempoAcceso).forEach(id_usuario => {
      tendenciaConNombres[idToUsernameMap[id_usuario]] = tendenciaTiempoAcceso[id_usuario];
    });

    const fechasUnicas = Object.values(registrosFiltrados) // Obtener los valores de tiempo transcurrido por usuario
  .flat() // Aplanar la matriz de matrices de tiempo transcurrido por usuario en una sola matriz
  .map(data => data.fecha_hora); // Obtener solo las fechas

  // Eliminar fechas duplicadas y ordenarlas
  const fechasUnicasOrdenadas = Array.from(new Set(fechasUnicas)).sort((a, b) => new Date(a) - new Date(b));
  setFecha(fechasUnicasOrdenadas);
      
  
    console.log(arrayRegistros);
    // `tendenciaConNombres` ahora contiene los nombres de usuario en lugar de IDs
    setTendencias(tendenciaConNombres);
  }, []);
  

  if (!tendencias) {
    return null; // O podrías mostrar un mensaje de carga mientras se calculan las tendencias
  }

  
  const [series, setSeries] = useState([]);
  
  useEffect(() => {
    const arrayRegistros = Object.entries(tendencias);
    const newData = [];
    arrayRegistros.forEach(([nombreUsuario, registros]) => {
      const formattedData = registros.map((registro, index) => ({
        x: index + 1,
        y: registro.tiempoTranscurrido, // Si los valores ya están en horas, no necesitas dividirlos
        nombreUsuario: `Usuario: ${nombreUsuario}`,
        tiempoEnHoras: registro.tiempoTranscurrido,
      }));
      newData.push({
        name: `${nombreUsuario}`,
        data: formattedData,
      });
    });
  


    setSeries(newData);
  }, [tendencias]);
  
      
  const [options, setOptions] = useState({
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Tendencia de tiempos de acceso para ubicación Centro de datos',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: 'Tiempo (en horas)', // Actualiza la etiqueta del eje X para reflejar el tiempo
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0); // Muestra el tiempo en horas como número entero
        },
      },
      title: {
        text: 'Usuarios', // Actualiza la etiqueta del eje Y
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(0); // Formatea el valor Y (tiempo en horas) en el tooltip a número entero
        },
      },
      formatter: function (tooltipData) {
        const userData = tooltipData.series[tooltipData.seriesIndex].data[tooltipData.dataPointIndex];
  
        if (userData) {
          return `Usuario: ${userData.nombreUsuario}, Tiempo: ${userData.tiempoEnHoras.toFixed(0)} horas`;
        }
        return '';
      },
    },
  });
    
    
      return (
        <div className='mt-4 p-3 w-12/12 bg-white rounded-lg text-lg shadow-xl mr-10'>
          <ReactApexChart options={options} series={series} type="area" height={300} />
        </div>
      );
    };

export default GraficaTiempo
