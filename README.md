# paltzi_cursoAsincronismoJS
Curso de asincronismo con JS
## Definiciones
### Event loop
JS es un lenguaje de programación asíncrono y no bloqueante con un manejador de eventos conocido como event loop, implementado en un único hilo para sus fases de entrada y salida
### API
Interfaz de programación de aplicaciones (Application Programming Interface). Es un conjunto de rutinas que provee acceso a funciones de un determinado software.
### Concurrencia
Cuando dos o más tareas progresan simultáneamente.
### Paralelismo
Cuando dos o más tareas se ejecutan, literalmente, a la vez, en el mismo instante de tiempo.
### Bloqueante
Una llamada u operación bloqueante no devuelve el control a nuestra aplicación hasta que se ha completado. Por tanto el thread queda bloqueado en estado de espera.
### Síncrono
Es frecuente emplear ‘bloqueante’ y ‘síncrono’ como sinónimos, dando a entender que toda la operación de entrada/salida se ejecuta de forma secuencial y, por tanto, debemos esperar a que se complete para procesar el resultado.
### Asíncrono
La finalización de la operación I/O se señaliza más tarde, mediante un mecanismo específico como por ejemplo un callback, una promesa o un evento, lo que hace posible que la respuesta sea procesada en diferido.
### Call Stack
Es donde nuestras funciones van a ser puestas en ejecución. La pila de llamadas, se encarga de albergar las instrucciones que deben ejecutarse. Nos indica en que punto del programa estamos, por donde vamos.
### Heap /  memoryHeap
Espacio en memoria compartido para nuestra aplicación, Región de memoria libre, normalmente de gran tamaño, dedicada al alojamiento dinámico de objetos. Es compartida por todo el programa y controlada por un recolector de basura que se encarga de liberar aquello que no se necesita.
### Cola o Queue
Cada vez que nuestro programa recibe una notificación del exterior o de otro contexto distinto al de la aplicación, el mensaje se inserta en una cola de mensajes pendientes y se registra su callback correspondiente.
### Eventloop o Loop de eventos
Cuando la pila de llamadas (call stack) se vacía, es decir, no hay nada más que ejecutar, se procesan los mensajes de la cola. Con cada ‘tick’ del bucle de eventos, se procesa un nuevo mensaje.
### Hoisting
Sugiere que las declaraciones de variables y funciones son físicamente movidas al comienzo del código en tiempo de compilación.
### DOM
DOM permite acceder y manipular las páginas XHTML como si fueran documentos XML. De hecho, DOM se diseñó originalmente para manipular de forma sencilla los documentos XML.
### XML
Lenguaje de marcado creado para la transferencia de información, legible tanto para seres humanos como para aplicaciones informáticas, y basado en una sencillez extrema y una rígida sintaxis. Así como el HTML estaba basado y era un subconjunto de SGML, la reformulación del primero bajo la sintaxis de XML dio lugar al XHTML; XHTML es, por tanto, un subconjunto de XML.
### Events
Comportamientos del usuario que interactúa con una página que pueden detectarse para lanzar una acción, como por ejemplo que el usuario haga click en un elemento (onclick), que elija una opción de un desplegable (onselect), que pase el ratón sobre un objeto (onmouseover), etc.
### Compilar
Compilar es generar código ejecutable por una máquina, que puede ser física o abstracta como la máquina virtual de Java.
### Transpilar
Transpilar es generar a partir de código en un lenguaje código en otro lenguaje. Es decir, un programa produce otro programa en otro lenguaje cuyo comportamiento es el mismo que el original.

## Resources

### Public API
[APIS](https://github.com/public-apis/public-apis)

## Taller 1 - call back

Analizamos la siguiente Función

~~~JS
function sum(num1, num2) {
    return num1 + num2
}
function calc(num1, num2, callback) {
    return callback(num1, num2)
}
function date(callback) {
    console.log(new Date);
    setTimeout(function () {
        let date = new Date;
        callback(date)
    }, 3000)
    console.log("Terminada la funcion date");
}
function printDate(dateNow) { 
    
    console.log(dateNow);
    console.log("Terminada la funcion printDate");
}
date(printDate);
console.log(calc(3, 3, sum));

// 2021-07-19T23:54:18.312Z
// Terminada la funcion date
// 6
// 2021-07-19T23:54:21.319Z
// Terminada la funcion printDate
~~
Se va a ejecutar de la siguiente manera:

1 - Se llama a `date(printDate);`
2 - como se llama a la función date con otra función como parámetro se ejecuta primero date por lo que se imprime `console.log(new Date);`
3 - Al tener el `setTimeout`esta función pasa a callback
4 - continúa la ejecución -> `console.log("Terminada la funcion date");`
5 - continúa la ejecución -> `console.log(calc(3, 3, sum));`, también manda a callback calc y sum, resuelve sum luego calc
6 - llamado a callback `setTimeout` (que se ejecutó "en paralelo") es decir que tomo la foto a los 3 segundos pero el resultado no lo mostratá (llamando a `printDate`) hasta haber resuelto la cola ('console.log(calc(3, 3, sum));')

7 - es decir si nosotro agregamos un tiempo de espera a 'calc':
~~~JS
function calc(num1, num2, callback) {
    setTimeout(() => {
        
    }, 5000);
    return callback(num1, num2)
}
~~~
por más que el tiempo de espera será de 5 segundos, la diferencia entre el printDate y date será de 3 segundos.

~~~js
// 2021-07-20T00:08:06.321Z
// Terminada la funcion date
// 6
// 5 segundos despues....
// 2021-07-20T00:08:09.329Z
// 3 segundos despues....
// Terminada la funcion printDate
~~~

## Taller 1 - Petición a API - callback

#### Recurso:
Como la información que vamos a tomar es extensa [API-data](https://rickandmortyapi.com/api/character/)
Para esto utilizamos una API, para poder ver la información de manera más ordenada utilizamos la API **postman**, que debemos instalarla
Podemos utilizar la extensión de google [JSON-viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh/related)

### Idea general
Nosotros queremos conocer la *Dimensión* del personaje, pero esto no está en la primera API, sino quue está en un link a una segunda API dentro de la primera, por lo que el proceso sería el seguiente

Nuestra APP -> Seleccionar personaje -> Primera API -> Segunda API -> OBTENER DIMENSION 

### comenzando
* como vamos a trabajar con node (no con html), las peticiones las vamos a hacer con XMLHttpRequest que es la forma antigua de hacer llamados, como el profesor lo menciona usa ese y no Fetch que es el actual, por que no conocemos aùn las promesas y fecth es con promesas, para saber por que el profesor uso OPEN y todas esas funciones aqui està la forma de usar [XMLHttpRequest](https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest.)
  * Instalando la dependecia para xml...
~~~
npm install xmlhttprequest --save
~~~
~~~JS
// instanciando XML
let XMLHttprequest = require('xmlhttprequest').XMLHttpRequest

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
~~~
## Taller 1 - Petición a API - promise

## Taller 1 - Petición a API - async await

~~~javascript
const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => resolve('do something async'), 3000)
            : reject(new Error('Test Error'))
    });
}

const doSomething = async () => {
    const something = await doSomethingAsync();
    console.log(something);
}

console.log('Before');
doSomething()
console.log('after');

// capturando errores

const anotherFunction = async () => {
    try {
        const something = await doSomethingAsync();
        console.log(something);
    } catch (error) {
        console.error(error);
    }
}


console.log('Before 1');
anotherFunction()
console.log('after 1');
~~~

## Conclusiones

Ventajas y Desventajas

Callbacks
V = Es simple una función que recibe otra función
V = Son universales
D = Composición tosca
D = Callbacks Hell
D = Flujo poco intuitivo
D = Debemos pensar que estamos haciendo código para humanos y debe ser facil de leer
D = if FecthData, if FecthData, if FecthData y se vuelve tedioso y no se maneja excepciones

Promise
V = Fácilmente enlazable then y return, then y return y asi
V = Es poderoso // es muy recomendado para desarrolladores
D = NO maneja excepciones si no maneja un catch al final y seremos propensos a errores
D = Requiere un polyfile para ser transpilados y ser interpretados en todos los navegadores //Babbel

Async Await
V = El tradicional try - catch y manejar las excepciones de manera mas fluida
V = Mas fáciles de leer que sucedera que va a suceder
D = Ese poder que podemos decir es decir si queremos algo debemos esperar que algo suceda
D = Requiere un polyfile para ser transpilados y ser interpretados en todos los navegadores //Babbel