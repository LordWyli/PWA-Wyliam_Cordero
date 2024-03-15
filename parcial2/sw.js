//Ciclo de vida del Service Worker
self.addEventListener('install', event =>{
    console.log('Instalando el service worker');
    const installing = new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Instalacion finalizada.');
        }, 1000);
        self.skipWaiting();
        resolve();
    });

    event.waitUntil(installing);
});

self.addEventListener('activate',event => {
    console.log('SW: Service Worker Activo');
});


// Intercepta  imágen
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    
    // Intercepta las solicitudes de imágenes
    if (requestUrl.pathname.startsWith('/img/')) {
        
        event.respondWith(
            fetch('./img/logoNFL.png')
        );
    }
    
});

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // Intercepta API
    if (requestUrl.origin === 'http://jsonplaceholder.typicode.com' && requestUrl.pathname === '/todos') {
        event.respondWith(
            fetch(event.request) 
                .then(response => {
                    
                    if (!response.ok) {
                        throw new Error('No se pudo obtener los datos');
                    }
                    
                    return response.json();
                })
                .then(data => {
                    
                    data.forEach(item => {
                        item.id = `${item.id}  $$$`; 
                    });
                    
                    return new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                })
                .catch(error => {
                    console.error('Error al interceptar la solicitud de la API:', error);
                    
                    return new Response('Error al obtener datos de la API', { status: 500 });
                })
        );
    }
});



