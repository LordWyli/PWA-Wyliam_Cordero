const axios = require('axios');

function mostrarMenu() {
    console.log("Seleccione una opción:");
    console.log("1. Lista de todos los pendientes (solo IDs)");
    console.log("2. Lista de todos los pendientes (IDs y Titles)");
    console.log("3. Lista de todos los pendientes sin resolver (ID y Title)");
    console.log("4. Lista de todos los pendientes resueltos (ID y Title)");
    console.log("5. Lista de todos los pendientes (IDs y userID)");
    console.log("6. Lista de todos los pendientes resueltos (ID y userID)");
    console.log("7. Lista de todos los pendientes sin resolver (ID y userID)");
    console.log("0. Salir");
}

function obtenerDatosDesdeAPI(opcionSeleccionada) {
    const url = "http://jsonplaceholder.typicode.com/todos";
    return axios.get(url)
        .then(response => {
            const data = response.data;
            switch (opcionSeleccionada) {
                case '1':
                    return data.filter(item => !item.completed).map(item => `ID: ${item.id}`);
                case '2':
                case '3':
                    return data.filter(item => !item.completed).map(item => `ID: ${item.id}, Title: ${item.title}`);
                case '4':
                    return data.filter(item => item.completed).map(item => `ID: ${item.id}, Title: ${item.title}`);
                case '5':
                    return data.filter(item => !item.completed).map(item => `ID: ${item.id}, userID: ${item.userId}`);
                case '6':
                    return data.filter(item => item.completed).map(item => `ID: ${item.id}, userID: ${item.userId}`);
                case '7':
                    return data.filter(item => !item.completed).map(item => `ID: ${item.id}, userID: ${item.userId}`);
                case '0':
                    return ['Exit.'];
                default:
                    return ['Invalido.'];
            }
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error.message);
            return ['Error al obtener datos de la API'];
        });
}

function handleSelectChange(opcionSeleccionada) {
    obtenerDatosDesdeAPI(opcionSeleccionada)
        .then(resultados => {
            resultados.forEach(resultado => {
                console.log(resultado);
            });
        });
}

function seleccionarOpcion() {
    mostrarMenu();
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.question('Ingrese opcion numerica deseada: ', opcionSeleccionada => {
        handleSelectChange(opcionSeleccionada);
        readline.close();
    });
}

seleccionarOpcion();
