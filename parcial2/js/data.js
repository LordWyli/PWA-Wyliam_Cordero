document.getElementById('menuForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const opcionSeleccionada = document.getElementById('opcion').value;
    handleSelectChange(opcionSeleccionada);
});

function handleSelectChange(opcionSeleccionada) {
    obtenerDatosDesdeAPI(opcionSeleccionada)
        .then(resultados => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = ''; 

            resultados.forEach(resultado => {
                const p = document.createElement('p');
                p.textContent = resultado;
                resultadoDiv.appendChild(p);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error.message);
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = 'Error al obtener datos de la API';
        });
}

function obtenerDatosDesdeAPI(opcionSeleccionada) {
    const url = "http://jsonplaceholder.typicode.com/todos";
    return fetch(url)
        .then(response => {
            
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            
            return response.json();
        })
        .then(data => {
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
        });
}
