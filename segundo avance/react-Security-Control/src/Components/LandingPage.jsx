
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
          window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth' // Scroll suave
          });
        }
      };
    
  return (
    <div className='h-screen bg-slate-200'>
       <nav className='text-sm flex justify-between items-center p-5 font-semibold'>
    <section>
        <h4 className='text-lg'>Security <span className='text-cyan-900'>Control</span></h4>
    </section>
    <section className='flex justify-center flex-1'>
        <h4 onClick={() => scrollToSection('objetivos')} className=' cursor-pointer mx-4'>Objetivos</h4>
        <h4 onClick={() => scrollToSection('nosotros')} className=' cursor-pointer mx-4'>Nosotros</h4>
        <h4 onClick={() => scrollToSection('lenguajes')} className=' cursor-pointer mx-4'>Lenguajes utilizados</h4>
        <h4 onClick={() => scrollToSection('fundadores')} className=' cursor-pointer mx-4'>Fundadores</h4>
    </section>
    <section className='flex'>
        <Link to="/Login" className='text-sm mr-2 rounded-md text-cyan-700 font-semibold border-cyan-700 border-2 py-2 px-2 transition-colors hover:bg-cyan-800 hover:text-white'>Iniciar Sesion</Link>
        <button className=' rounded-full font-semibold px-4 bg-slate-300'>?</button>
    </section>
</nav>
<section className='flex items-center justify-around p-8'>
<article className="w-3/5 animate-float">
  <div className="flex flex-col justify-center">
    <h2 className="text-5xl font-bold mb-4">Bienvenidos a Security {} <span>Control</span></h2>
    <p className="text-xl font-semibold mb-2 text-gray-800">Seguridad ante todo, buscamos reducir riesgos</p>
    <p className="text-xl font-semibold text-gray-800 mb-4">Implementando la tecnología más moderna</p>
    <div className="flex">
      <input className='bg-gray-800 p-2 rounded-l-lg text-white' placeholder='+52 0000000000' type="text" />
      <button className="hover:bg-cyan-800 bg-cyan-700 w-1/6 text-white font-semibold py-2 rounded-r-lg">
        Contactanos
      </button>
    </div>
  </div>
</article>

    <article className="w-1/5 ml-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="../../public/Seguridad.jpg" alt="Descripción de la imagen" className="w-full" />
        </div>
    </article>
</section>

<section className="bg-gray-800 py-12" id="objetivos">
    <div className="max-w-5xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-8">Objetivos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4">Optimización de la precisión y confiabilidad electrónica</h3>
                <p className="text-lg">Mejorar la precisión y confiabilidad electrónica de control de acceso.</p>
            </div>

            <div className="bg-gray-700 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4">Optimización de la Gestión del Flujo de Personas en Zonas Designadas</h3>
                <p className="text-lg">Administrar eficientemente el flujo de personas en áreas designadas.</p>
            </div>

            <div className="bg-gray-700 rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold mb-4">Mejora de la Toma de Decisiones Correctivas a través del Análisis de Datos</h3>
                <p className="text-lg">Agilizar la toma de decisiones correctivas mediante el análisis de datos y la detección y alerta de actividades inusuales.</p>
            </div>
        </div>
    </div>
</section>


<section className="bg-gray-200 py-32" id="nosotros">
    <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Nosotros</h2>
        <div className="border-b-2 border-gray-400 mx-auto w-16 mb-8"></div>
        <p className="text-lg text-gray-700">
            Somos una empresa comprometida con la seguridad y la innovación. Nuestro objetivo es proporcionar soluciones efectivas y confiables para garantizar la protección y el control de acceso en entornos diversos. Con años de experiencia y un equipo altamente capacitado, trabajamos para ofrecer tecnologías avanzadas y servicios de calidad que se adapten a las necesidades de nuestros clientes.
        </p>
    </div>
</section>

<section className="bg-gray-900 py-28" id="lenguajes">
    <div className="max-w-5xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-8">Lenguajes Utilizados</h2>

        <div className="flex justify-center space-x-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center flex-1 transition-transform transform hover:scale-105">
             <img src="../../public/react.png" alt="Icono React" className="w-13 h-16  mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-2">React</h3>
                <p className="text-sm">Biblioteca JavaScript para construir interfaces de usuario interactivas.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center flex-1 transition-transform transform hover:scale-105">
                <img src="../../public/laravel.png" alt="Icono Laravel" className="w-44 h-34 mx-auto mb-1" />
                <h3 className="text-xl font-semibold mb-2">Laravel</h3>
                <p className="text-sm">Framework PHP para el desarrollo de aplicaciones web.</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center flex-1 transition-transform transform hover:scale-105">
                <img src="../../public/arduino.png" alt="Icono Arduino" className="w-25 h-20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Arduino C++</h3>
                <p className="text-sm">Lenguaje de programación para el desarrollo en plataformas de hardware de código abierto.</p>
            </div>
        </div>
    </div>
</section>
<section className="bg-gray-100 py-20" id="fundadores">
    <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Nuestros Fundadores</h2>

        <div className="flex justify-center space-x-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105 h-full">
                <img src="../../public/roque.jpeg" alt="Fundador 1" className="w-32 h-32 rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold mb-2">Roque Vargas Luis Roberto</h3>
                <p className="text-sm">Desarrollador Front End</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105 h-full">
                <img src="../../public/juan.jpeg" alt="Fundador 2" className="w-32 h-32 rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold mb-2">Reyes Navarro Juan Alberto</h3>
                <p className="text-sm">Implementacion de IoT</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105 h-full">
                <img src="../../public/wyli.jpeg" alt="Fundador 3" className="w-32 h-32 rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold mb-2">Cordero Tovilla Wyliam</h3>
                <p className="text-sm">Desarrollador Back End</p>
            </div>
        </div>
    </div>
</section>


</div>
  )
}

export default LandingPage
