// Importo un archivo JavaScript llamado "functions.js" que contiene las funciones que el código se encargará de llamarlas más adelante.
import functions from "./functions.js";

// Establezco una variable "localAPI" que contiene la ruta al archivo "JSON" con todos los datos.
let localAPI = "./assets/js/amazingEvents.json";

// Creo dos matrices vacías para almacenar todos los eventos y todas las categorías.
let allEvents = [];
let categories = [];

// Creo una función asincrónica llamada "fetchLocalAPI" que se utiliza para obtener los datos del archivo "JSON".
// Esta función utiliza la palabra clave "async" para indicar que se ejecuta de forma asíncrona, es decir, no se detiene el flujo de ejecución del programa mientras se espera a que se obtengan los datos.
async function fetchLocalAPI() {
    try {
        // Utilizo la función "fetch()" para obtener los datos del archivo "JSON".
        const response = await fetch(localAPI)
        // Utilizo el método "json()" para convertir los datos obtenidos en formato "JSON" a objetos "JavaScript".
        const data = await response.json()

        // Almaceno todos los eventos en la matriz "allEvents".
        allEvents = data.events

        // Creo una copia de la matriz "allEvents" y almacenarla en la variable "filterData" y "filterData2".
        filterData = allEvents
        filterData2 = filterData

        // Creo todas las categorías utilizando la función "createCategories" del archivo "functions.js".
        categories = functions.createCategories(allEvents)
        
        // Creo todos los elementos checkbox de categorías utilizando la función "createCheckboxes" del archivo "functions.js".
        functions.createCheckboxes(categories,$categories)

        // Creo todas las tarjetas de eventos utilizando la función "createCards" del archivo "functions.js".
        functions.createCards(filterData,"template","cards")
    }
    catch (error) {
        // Si hay algún error, se mostrará en la consola de desarrollador en el navegador.
        console.log(error)
    }
};
// Llamo a la función "fetchLocalAPI" para obtener los datos de los eventos. Esto hace que se ejecute la función para obtener los datos del archivo JSON y crear las tarjetas de eventos.
fetchLocalAPI();

// A continuación, creo dos variables adicionales "filterData" y "filterData2" que se utilizan para almacenar datos filtrados. Estas variables se inicializan con el array "allEvents".
let filterData = allEvents;
let filterData2 = filterData;

// Creo una constante "$categories" que contiene el elemento HTML con el ID "categories".
const $categories = document.getElementById("categories");

// Agrego un "escucha de eventos" al elemento HTML "$categories" que se activa cuando cambia el valor de un "checkbox".
//Luego, agrego un "event listener" para cuando el usuario cambie las casillas de verificación. Cuando estas se cambian, se llama a la función "filterByCategory" definida en el archivo "functions.js".
// Esta función toma el array "allEvents" y una cadena de texto que representa la categoría seleccionada por el user. La función devuelve un nuevo array que contiene solo los eventos que pertenecen a la categoría seleccionada.
// Después de filtrar por categoría, se llama a la función "filterByKeyword" definida en el archivo "functions.js". Esta función toma el array filtrado por categoría y una cadena de texto que representa la palabra clave que el user ha ingresado en un cuadro de búsqueda en la página.
// La función devuelve un nuevo arreglo que contiene solo los eventos que contienen la palabra clave. Finalmente, se llama a la función "createCards" para crear nuevas tarjetas de eventos basadas en los datos filtrados.
$categories.addEventListener("change",function () {
    // Obtengo todos los elementos "checkbox" dentro de "$categories".
    let $checkbox = $categories.getElementsByTagName("input")
    let txt = ""

    // Recorro todos los elementos "checkbox" y agrego a la var "txt" el valor de los "checkbox" seleccionados.
    for (let i = 0; i < $checkbox.length; i++) {
        if ($checkbox[i].checked) {
            txt += $checkbox[i].id.toLocaleLowerCase()
        }
    }

    // Si se han seleccionado checkbox, filtro los eventos por categoría utilizando la función "filterByCategory" del archivo "functions.js".
    if (!txt == "") {
        filterData = functions.filterByCategory(allEvents,txt)
    }
    // Si NO se han seleccionado checkbox, utilizo todos los eventos almacenados en "allEvents".
    else {
        filterData = allEvents
    }

    // Filtro los eventos por "palabra clave" utilizando la función "filterByKeyword" del archivo "functions.js".
    filterData2 = functions.filterByKeyword(filterData,$search.value)
    // Creo todas las tarjetas de eventos utilizando la función "createCards" del archivo "functions.js" y los eventos filtrados almacenados en "filterData2".
    functions.createCards(filterData2,"template","cards")
});

// Creo una constante "$search" que contiene el elemento HTML con el ID "search".
// Después, agrego un "event listener" para cuando el user escriba en el cuadro de búsqueda. Cuando lo hace, se llama a la función "filterByKeyword" definida en el archivo "functions.js" para filtrar los eventos por palabra clave.
const $search = document.getElementById("search");
// Agrego un event listener al elemento HTML "$search" que se activa cuando se escribe algo en el campo de búsqueda.
$search.addEventListener("input",function (e) {
    // Con esto, si se presiona la tecla "Escape", se borra el contenido del campo de búsqueda y se utilizan todos los eventos almacenados en "filterData".
    if (e.key === "Escape") {
        $search.value = ""
        filterData2 = filterData
    }

    // Filtro los eventos por palabra clave utilizando la función "filterByKeyword" del archivo "functions.js".
    filterData2 = functions.filterByKeyword(filterData,$search.value)
    // Creo todas las tarjetas de eventos utilizando la función "createCards" del archivo "functions.js" y los eventos filtrados almacenados en "filterData2".
    functions.createCards(filterData2,"template","cards")
});

// Creo una constante "$searchForm" que contiene el elemento HTML con el ID "searchForm".
//Finalmente, se agrega un event listener para cuando el user envíe el formulario de búsqueda. Cuando eso pasa, se llama a la función "createCards" para crear nuevas tarjetas de eventos basadas en los datos filtrados.
const $searchForm = document.getElementById("searchForm");
// Agrego un event listener al elemento HTML "$searchForm" que se activa cuando se envía el formulario de búsqueda.
$searchForm.addEventListener("submit",function (e) {
    // Esto evitará que se recargue la página.
    e.preventDefault()
    // Creo todas las tarjetas de eventos utilizando la función "createCards" del archivo "functions.js" y los eventos filtrados almacenados en "filterData2".
    functions.createCards(filterData2,"template","cards")
});



/* DOCUMENTACIÓN:
Este código es para la aplicación web de "Amazing Events", la cual permite filtrar y mostrar eventos de una lista de eventos en función de categorías y palabras clave introducidas en el campo de búsqueda.
La aplicación utiliza funciones del archivo "functions.js" para realizar el filtrado y la visualización de los eventos.
En primer lugar, se importa la función "functions" desde el archivo "functions.js" utilizando la sintaxis de importación de módulos de "JavaScript".
A continuación, se declaran tres variables: "localAPI", "allEvents" y "categories". La variable "localAPI" almacena la URL de un archivo "JSON" que contiene una lista de eventos.
La variable "allEvents" almacena la lista de eventos, que se obtiene de la API en la función "fetchLocalAPI". La variable "categories" almacena una lista de categorías de eventos, que se crea dinámicamente a partir de la lista de eventos utilizando la función "createCategories" del archivo "functions.js".
La función "fetchLocalAPI" utiliza la API Fetch de JavaScript para obtener los datos del archivo JSON a través de la URL almacenada en la variable "localAPI".
Los datos se convierten a un objeto JavaScript utilizando el método "json()" del objeto Response. La lista de eventos se almacena en la variable "allEvents". La función también actualiza las variables "filterData" y "filterData2" con la lista de eventos completa.
A continuación, se añade un event listener al elemento HTML con el ID "categories". Este event listener se ejecuta cuando cambia el valor de los checkboxes de categorías en la página web.
Cuando se detecta un cambio, la función busca los checkboxes seleccionados y almacena los IDs de las categorías seleccionadas en una variable llamada "text".
Luego, utiliza la función "filterByCategory" del archivo "functions.js" para filtrar los eventos por categoría. Si no se selecciona ninguna categoría, se muestran todos los eventos. Después, utiliza la función "filterByKeyword" del archivo "functions.js" para filtrar los eventos por palabra clave introducida en el campo de búsqueda.
Por último, utiliza la función "createCards" del archivo "functions.js" para mostrar los eventos filtrados en forma de tarjetas en la página web.
Además, el código también añade un event listener al elemento HTML con el ID "search". Este event listener se ejecuta cuando se introduce una palabra clave en el campo de búsqueda.
Si se pulsa la tecla "Escape", se vacía el campo de búsqueda y se muestran todos los eventos. En caso contrario, se utiliza la función "filterByKeyword" del archivo "functions.js" para filtrar los eventos por palabra clave introducida en el campo de búsqueda.
Después, se utiliza la función "createCards" del archivo "functions.js" para mostrar los eventos filtrados en forma de tarjetas en la página web.
Por último, el código también añade un event listener al elemento HTML con el ID "searchForm". Este event listener se ejecuta cuando se envía el formulario de búsqueda.
La función utiliza la función "createCards" del archivo "functions.js" para mostrar los eventos filtrados en forma de tarjetas en la página web.
En resumen, este código es una aplicación web que permite filtrar y mostrar eventos de una lista de eventos en función de categorías y palabras clave introducidas en el campo de búsqueda.
La aplicación utiliza funciones del archivo "functions.js" para realizar el filtrado y la visualización de los eventos.
*/

//{Code with ♥ for github.com/JoeTheorium}//