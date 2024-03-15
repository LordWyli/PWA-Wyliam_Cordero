if (navigator.serviceWorker) {
    console.log("Si es compatible")
    navigator.serviceWorker.register('../sw.js');
}