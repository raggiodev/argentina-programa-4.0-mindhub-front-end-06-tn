// Importo un módulo de funciones.
import functions from "./functions.js";

// Declaro una variable llamada "localAPI" que contiene la ruta de acceso al archivo "JSON" que contiene los datos de todos los eventos.
let localAPI = "../assets/js/amazingEvents.json";

// Creo matrices vacías donde se guardarán: todos los eventos, eventos próximos y eventos pasados, respectivamente.
let allEvents = [];
let upcomingEvents = [];
let pastEvents = [];

// Defino variables que contienen elementos del DOM donde se mostrarán las estadísticas.
const $stats = document.getElementById("stats");
const $upcomingEventsStats = document.getElementById("upcomingEventsStats");
const $pastEventsStats = document.getElementById("pastEventsStats");

// Creo variables que son matrices vacías donde se guardarán los eventos con mayor y menor asistencia, así como los eventos con la mayor capacidad, como está en la tabla.
let topAttendanceEvents = [];
let lowestAttendanceEvents = [];
let largerCapacityEvents = [];

// Inicio con la función asincrónica que utiliza la API fetch para obtener los datos del JSON.
async function fetchLocalAPI() {
    try {
        const response = await fetch(localAPI); // La primera línea de "fetchLocalAPI" utiliza la palabra clave "await" para esperar la respuesta de la API local antes de continuar. La respuesta se almacena en la constante "response".
        const data = await response.json();     // La segunda línea utiliza "await" de nuevo para esperar a que la respuesta se convierta en formato "JSON". El objeto "JSON" se almacena en la constante "data".

        // Divido los eventos en matrices separadas de todos los eventos, eventos próximos y eventos pasados, respectivamente.
        allEvents = data.events; // Asigno la matriz "data.events" a la variable "allEvents".
        upcomingEvents = data.events.filter(e => e.date >= data.currentDate) // Filtro los eventos futuros utilizando el método "filter", que crea una nueva matriz que contiene solo los elementos que cumplen con la condición de que la fecha del evento sea igual o posterior a la fecha actual. Esta matriz se almacena en la variable "upcomingEvents".
        pastEvents = data.events.filter(e => e.date < data.currentDate)      // Filtro los eventos pasados utilizando el método "filter", pero esta vez la condición es que la fecha del evento sea igual o menor a la fecha actual. Esta matriz se almacena en la variable "pastEvents".

        // Creo una matriz llamada "attendancePercentage" utilizando el método "map", que toma una matriz y devuelve una nueva matriz con los mismos elementos pero modificados según la función proporcionada. La función comprueba si el evento tiene una estimación de asistencia. Si es así, la función devuelve la estimación dividida por la capacidad del evento. Si NO hay una estimación, se devuelve la asistencia real dividida por la capacidad. Esta matriz se almacena en la variable "attendancePercentage".
        let attendancePercentage = allEvents.map(e => {
            if (e.estimate) {
                return Number(e.estimate / e.capacity)
            }
            else {
                return Number(e.assistance / e.capacity)
            }
        })

        // Utilizo el operador de propagación (Sintaxis Spread) para convertir la matriz "attendancePercentage" en una lista de argumentos. Luego, se utilizan las funciones "Math.max()" y "Math.min()" para encontrar los porcentajes de asistencia más altos y más bajos que se almacenarán en las variables "maxAttendancePercentage" y "minAttendancePercentage", respectivamente.
        let maxAttendancePercentage = Math.max(...attendancePercentage)
        let minAttendancePercentage = Math.min(...attendancePercentage)

        // Filtro de nuevo la matriz "allEvents" para encontrar los eventos con el porcentaje de asistencia más alto utilizando el método "filter". La función de filtrado comprueba si el evento tiene una estimación de asistencia. Si es así, comprueba si la estimación dividida por la capacidad es igual al porcentaje de asistencia más alto. Si NO hay una estimación, se comprueba si la asistencia real dividida por la capacidad es igual al porcentaje de asistencia más alto. Los nombres de estos eventos, junto con su porcentaje de asistencia, se combinan en una sola "cadena" y se almacenan en la variable "topAttendanceEvents".
        topAttendanceEvents = allEvents.filter(e => {
            if (e.estimate) {
                if ((e.estimate / e.capacity) == maxAttendancePercentage) {
                    return e.name
                }
            }
            else {
                if ((e.assistance / e.capacity) == maxAttendancePercentage) {
                    return e.name
                }
            }
        }).map(e => [e.name,(maxAttendancePercentage * 100).toFixed(2) + "%"].join(" "))

        // Filtro por última vez la matriz "allEvents" para encontrar los eventos con el porcentaje de asistencia más bajo utilizando el método "filter". La función de filtrado es similar a la del anterior, pero esta vez se comprueba si el porcentaje de asistencia es igual al porcentaje de asistencia más bajo. Los nombres de estos eventos, junto con su porcentaje de asistencia, se combinan en un solo "string" y se almacenan en la variable "lowestAttendanceEvents".
        lowestAttendanceEvents = allEvents.filter(e => {
            if (e.estimate) {
                if ((e.estimate / e.capacity) === minAttendancePercentage) {
                    return e.name
                }
            }
            else {
                if ((e.assistance / e.capacity) === minAttendancePercentage) {
                    return e.name
                }
            }
        }).map(e => [e.name,(minAttendancePercentage * 100).toFixed(2) + "%"].join(" "))

        // Creo una matriz llamada "eventCapacities", que contiene solamente las capacidades de los eventos en la matriz "allEvents". Se utiliza la función "Math.max()" para encontrar la mayor capacidad de todos los events y se guarda en la variable "largerCapacity".
        let eventCapacities = allEvents.map(e => e.capacity)
        let largerCapacity = Math.max(...eventCapacities)

        // A continuación, filtro la matriz "allEvents" para obtener los eventos que tienen la mayor capacidad, utilizando el método "filter()", y se guardan en la variable "largerCapacityEvents". Para cada evento en esta matriz, se utiliza el método "map()" para crear un "string" que contiene el nombre del evento y su capacidad, que se une con un espacio en blanco.
        largerCapacityEvents = allEvents.filter(e => e.capacity === largerCapacity).map(e => [e.name,largerCapacity.toLocaleString('en-US')].join(" "))

        // Luego, agrego una nueva fila a la tabla de estadísticas en el doc. "HTML", utilizando la propiedad "innerHTML". Esta fila contiene tres celdas, cada una con un identificador de elemento "HTML" ("td1", "td2", "td3") que se utiliza posteriormente en la función "changeName()" para mostrar información estadística en la página de forma rotativa.
        $stats.innerHTML += `
            <tr class="text-center bg-white text-dark">
                <td id="td1">${topAttendanceEvents[0]}</td>
                <td id="td2">${lowestAttendanceEvents[0]}</td>
                <td id="td3">${largerCapacityEvents[0]}</td>
            </tr>
        `

        // Después, llamo a la función "groupSumByFirstElement()" del objeto "functions", que recibe una matriz de eventos y devuelve otra matriz que contiene información estadística agregada por categoría. Se utiliza esta función dos veces, una para los upcoming events y otra para los past events.
        let upcomingEventsStatsByCategory = functions.groupSumByFirstElement(upcomingEvents.map(e =>
            [e.category, (e.price * e.estimate), (100 * e.estimate / e.capacity)]
        ))
        createRows(upcomingEventsStatsByCategory,$upcomingEventsStats)

        // Finalmente, llamo a las funciones "createRows()" con las matrices de información estadística por categoría y los elementos de la página "HTML" donde se deben mostrar las tablas de estadísticas correspondientes. Estas funciones crean y agregan filas a las tablas "HTML" en función de la información estadística proporcionada en las matrices.
        let pastEventsStatsByCategory = functions.groupSumByFirstElement(pastEvents.map(e =>
            [e.category, (e.price * e.assistance), (100 * e.assistance / e.capacity)]
        ))
        createRows(pastEventsStatsByCategory,$pastEventsStats)

    }
    // El fragmento "catch" se ejecutará si se produce un error.
    catch (error) {
        console.log(error)
    }
};
// Se llama a la función para que se ejecute y realice la operación de obtención de datos de la API local.
fetchLocalAPI();

// Esta función "createRows()" toma un "array" y un "container" "HTML" como argumentos y crea "rows" para la tabla "HTML" con los datos del "array". Utiliza un ciclo "forEach()" para recorrer el "array" y agregar las "rows" al contenedor con "innerHTML".
function createRows(array, container) {
    container.innerHTML += array.map(e =>
        `<tr class="text-center bg-black text-light">
            <td>${e[0]}</td>
            <td>$${(e[1]).toLocaleString('en-US')}</td>
            <td>${(e[2])}%</td>
        </tr>`
    ).join('')
};

// Por último, con este fragmento de código cambio información de la tabla "HTML" cada ciertos segundos de manera repetida.
// Inicializo tres contadores en "0".
let i1 = 0;
let i2 = 0;
let i3 = 0;
// Creo una función llamada "changeContent" con un array específico, un id de elementos "td" y una de las vars.
function changeContent(array,td,index) {
    document.getElementById(td).textContent = array[index]
    return (index + 1) % array.length
};
// Cada llamada a "changeContent" actualiza el contenido del elemento "HTML" correspondiente con un elemento del array correspondiente, y luego actualiza la variable "i1", "i2", o "i3" para que sea el siguiente elemento en el array. El intervalo de tiempo se establece en 3000 milisegundos <=> se actualiza el contenido de los elementos HTML cada 3 segundos.
setInterval(function () { i1 = changeContent(topAttendanceEvents,   "td1", i1); }, 3000);
setInterval(function () { i2 = changeContent(lowestAttendanceEvents,"td2", i2); }, 3000);
setInterval(function () { i3 = changeContent(largerCapacityEvents,  "td3", i3); }, 3000);



/* DOCUMENTACIÓN:
Este es un archivo del leng. prog. JavaScript llamado "stats.js". Es como un cuaderno que contiene instrucciones para hacer cálculos y mostrar estadísticas sobre eventos. Los eventos son cosas divertidas a las que puedes ir, como conciertos o ferias.
Primero, importamos un montón de funciones que nos ayudarán a hacer los cálculos.
Luego, declaramos una variable llamada "localAPI" que contiene la ruta de acceso a un archivo que contiene información sobre los eventos.
Después, creamos algunas listas vacías donde guardaremos diferentes tipos de eventos, como los que ya sucedieron y los que están por venir.
A continuación, definimos algunas variables que representan partes de una página web donde mostraremos las estadísticas.
Después, creamos algunas listas vacías donde guardaremos información sobre los eventos que tienen la mayor asistencia, la menor asistencia y la mayor capacidad.
Finalmente, creamos una función que utiliza la información del archivo para calcular y mostrar diferentes estadísticas. La función busca en el archivo información sobre los eventos, como su fecha, capacidad y asistencia.
Con toda esa información, la función calcula cosas como el porcentaje de asistencia de cada evento, los eventos con la mayor y menor asistencia, y los eventos con la mayor capacidad. Todo esto se muestra en la página web.
Y eso es todo! Con esta información, podemos saber cuáles son los eventos más populares, cuáles son los que tienen más capacidad y cuáles son los que tendrán lugar próximamente.
*/

//{Code with ♥ for github.com/JoeTheorium}//