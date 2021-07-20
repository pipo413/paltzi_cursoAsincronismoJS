// instanciando XML
let XMLHttprequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
    // generando referencia al objeto que necesito
    let xhttp = new XMLHttprequest()
    // Hacemos el llamado a la url
    xhttp.open('GET', url_api, true)
    // Escucho lo que va a hacer esa conección
    xhttp.onreadystatechange = function (event) {
        // aca pongo la validación de los estados de peticion (son 5 -del 0 al 4)
        if (xhttp.readyState === 4) {
            // Ahora tomamos el status (por ejemplo el 200 es que todo marchó bien, 404 page not found y asi)
            if (xhttp.status === 200) {
                // El callback lleva generalmente el primer valor va a ser el error y el segundo el ok, como el correcto va a llevar un .json debemos parcearlo
                // Si no pasamos el JSON con responseText vamos a obtener todo como un string.
                callback(null, JSON.parse(xhttp.responseText))
            } else {
                // Forma correcta de colocar un ERROR
                const error = new Error('Error' + url_api)
                return callback(error, null)
            }
        }
    }
    // aqui enviamos la solicitud
    xhttp.send()
}

fetchData(API, function (error1, data1) {
    // manejando errores
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function (error2, data2) {
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, function (error3, data3) {
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);


        })
    })
})