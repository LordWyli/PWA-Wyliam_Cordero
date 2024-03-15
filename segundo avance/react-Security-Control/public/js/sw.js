self.addEventListener('install', event =>{
    console.log("SW: Instalando el service worker")
    const instaling = new Promise( (resolve, reject) => {
        setTimeout (()=>{
            console.log("SW: instalacion finalizada ")   
        }, 1000);
        self.skipWaiting();
        resolve();
    });
    
    event.waitUntil(instaling);
});

self.addEventListener('activate', event =>{
    console.log("SW: service worker Activo!");
});