if(navigator.serviceWorker)
{
    console.log('hi')
    //console.log("Si es compatible")
    navigator.serviceWorker.register('../sw.js')
}