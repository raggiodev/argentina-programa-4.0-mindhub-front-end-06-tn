// Esta función se encarga de crear tarjetas "HTML" a partir de un array de objetos de eventos.
// Toma tres argumentos: "allEvents" es el array de eventos, "template" es el ID del elemento "HTML" que se utilizará como plantilla para la tarjeta y "cards" es el "ID" del elemento HTML donde se colocarán las tarjetas.
// La función clona el elemento HTML de la plantilla, modifica el contenido de cada elemento de la tarjeta y agrega la tarjeta clonada al fragmento de documento. Luego, agrega el fragmento al elemento HTML de las tarjetas.
// Si no hay eventos, se muestra una imagen de error en su lugar.
function createCards(allEvents,template,cards) {
    const $template = document.getElementById(template).content
    const $cards = document.getElementById(cards)
    const fragment = document.createDocumentFragment()

    $cards.textContent = ""

    if (allEvents.length === 0) {
        let $section = document.createElement('section')
        $section.innerHTML = `<img src="../assets/img/error/404.jpeg" alt="HTTP Cats Error 404">`
        fragment.appendChild($section)
    }
    else {
        allEvents.forEach(event => {
            const { category,image,name,description,price,_id } = event
            const $clone = $template.cloneNode(true)

            $clone.querySelector('section').id = category;
            $clone.querySelector("section").className = "card bg-dark text-light cards-fix";
            $clone.querySelector('section img').style.backgroundImage = `url(${image})`
            $clone.querySelector('section img').className = "card-img-top";
            $clone.querySelector('section h3').textContent = name
            $clone.querySelector('section h3').className = "card-title";
            $clone.querySelector('section h5').textContent = description
            $clone.querySelector('section h5').className = "card-text";
            $clone.querySelector('section div p').textContent = `Price $${price}`
            $clone.querySelector('section div p').className = "";
            $clone.querySelector('section div a').href = `/pages/details.html?id=${_id}`
            $clone.querySelector('section div a').className = "d-flex";
            $clone.querySelector('section div a button').className = "btn btn-primary";

            fragment.appendChild($clone)
        })
    }

    $cards.appendChild(fragment)
};

// Esta función toma un array de objetos de eventos y devuelve un array con todas las categorías únicas de eventos.
function createCategories(array) {
    return [...new Set(array.map(e => e.category))]
};

// Esta función toma un array de categorías y un contenedor HTML como argumentos.
// Crea un fragmento de documento y luego para cada categoría, crea un elemento de etiqueta, lo agrega al fragmento y le asigna el nombre de la categoría.
// También crea un elemento de entrada de casilla de verificación, lo agrega al fragmento y le asigna el nombre y el ID de la categoría.
// Finalmente, agrega el fragmento al contenedor HTML.
function createCheckboxes(checkboxes,container) {
    const fragment = document.createDocumentFragment()

    checkboxes.forEach(category => {
        const $label = document.createElement("label")
        $label.textContent = category
        $label.setAttribute("for", category)
        $label.setAttribute("class", "text-light")
        fragment.appendChild($label)
        fragment.appendChild(Object.assign(document.createElement("input"), { type:"checkbox", name:category, id:category }))
    });
    container.appendChild(fragment)
};

// Esta función toma un array de eventos y un texto de filtro como argumentos.
// Devuelve un nuevo array que contiene solo los elementos del array de eventos que tienen una categoría que incluye el texto de filtro.
function filterByCategory(array,txt) {
    let leakedData = array.filter(e => txt.toLowerCase().includes(e.category.toLowerCase()))
    return leakedData
};

// Esta función toma un array de eventos y una palabra clave como argumentos.
// Devuelve un nuevo array que contiene solo los elementos del array de eventos que tienen un nombre que incluye la palabra clave.
function filterByKeyword(array,keyword) {
    return array.filter(e => e.name.toLowerCase().includes(keyword.toLowerCase().trim()))
};

// Esta función toma un array de subarrays y devuelve un nuevo array que agrupa los elementos del array original por el primer elemento y suma los valores de los elementos correspondientes.
// El array original debe tener subarrays con al menos tres elementos, y el primer elemento de cada subarray se utiliza como clave para agrupar los elementos.
// El segundo y tercer elemento se suman para crear un nuevo array de tres elementos, donde el tercer elemento es el promedio de los valores de los dos elementos anteriores, redondeado a dos decimales.
function groupSumByFirstElement(array) {
    return Object.entries(array.reduce((acc, [original, i1, i2]) => {
        acc[original] = acc[original] || [0, 0]
        acc[original][0] += i1
        acc[original][1] = ((acc[original][1] + i2) / 2)
        return acc
    }, {})).map(([prop, [i1, i2]]) => [prop, i1, i2.toFixed(2)])
};

// Este objeto contiene todas las funciones mencionadas anteriormente, agrupadas bajo nombres clave, todas contenidas en la variable local.
let functions = {createCards,createCategories,createCheckboxes,filterByCategory,filterByKeyword,groupSumByFirstElement};

// Exporto el objeto "functions" para que pueda ser utilizado en otros archivos JavaSript que lo importen usando el comando "import".
export default functions;



/* DOCUMENTACIÓN:
La primera función se llama "createCards" y su propósito es crear las "cards" de eventos en la página web. Esta función recibe tres parámetros: "allEvents" que es una matriz de objetos que contiene la información de cada evento, "template" que es el ID del elemento HTML que contiene el modelo para crear las "cards" y "cards" que es el ID del elemento HTML donde se colocarán las "cards" en la página. Dentro de la función, se obtiene el contenido del modelo y se limpia el contenido del elemento "cards". Luego, si la matriz "allEvents" está vacía, se crea una sección con un mensaje de error. De lo contrario, se itera sobre cada evento en la matriz "allEvents" y se clona el modelo para crear una "card" para cada uno de ellos, llenando la información con los valores correspondientes. Finalmente, se agrega cada "card" al fragmento y se agrega al elemento "cards".
La segunda función se llama "createCategories" y su propósito es crear una matriz de categorías únicas a partir de una matriz de objetos que contienen información sobre eventos. Esta función recibe un parámetro llamado "array" que es una matriz de objetos que contiene la información de cada evento. Dentro de la función, se utiliza la función "map" para crear una nueva matriz que contiene solo las categorías de cada objeto, luego se utilizan los operadores "spread" y "Set" para crear un nuevo conjunto con elementos únicos y se devuelve este conjunto convertido en una matriz.
La tercera función se llama "createCheckboxes" y su propósito es crear casillas de verificación para cada categoría única en una matriz de objetos que contienen información sobre eventos. Esta función recibe dos parámetros: "checkboxes" que es una matriz de categorías únicas y "container" que es el elemento HTML donde se colocarán las casillas de verificación. Dentro de la función, se crea un fragmento y se itera sobre cada categoría en la matriz "checkboxes". Se crea una etiqueta para cada categoría y se agrega al fragmento, luego se crea un elemento de entrada con atributos de nombre, id y tipo y se agrega al fragmento. Finalmente, el fragmento se agrega al contenedor.
La cuarta función se llama "filterByCategory" y su propósito es filtrar los eventos por categoría, devolviendo solo los que contienen una cadena de texto específica. Esta función recibe dos parámetros: "array" que es una matriz de objetos que contiene la información de cada evento y "txt" que es la cadena de texto que se utilizará para filtrar los eventos por categoría. Dentro de la función, se utiliza la función "filter" para crear una nueva matriz que solo contiene los eventos que contienen la cadena de texto especificada en la propiedad "category" de cada objeto. Luego, se devuelve esta nueva matriz.
La quinta función se llama "filterByKeyword" y su propósito es filtrar los eventos por palabra clave en el nombre del evento, devolviendo solo los que contienen una cadena de texto específica. La función filtra el array de objetos según si la propiedad name de cada objeto incluye la palabra clave (también convertida en minúsculas y sin espacios en blanco adicionales). Devuelve un nuevo array de objetos que contienen la palabra clave en su propiedad name.
La función "groupSumByFirstElement(array)" toma un array de arrays y agrupa los elementos del array original por el primer elemento. Luego, suma los valores de los elementos correspondientes y devuelve un nuevo array de arrays donde cada sub-array contiene el primer elemento del grupo y la suma de los valores correspondientes. La función utiliza el método reduce() para acumular los valores del array original y el método Object.entries() para convertir el objeto resultante en un array de arrays.
Finalmente, el objeto functions se exporta como valor predeterminado del módulo functions.js. Este objeto contiene todas las funciones definidas anteriormente y puede ser importado y utilizado en otros archivos del proyecto.
*/

//{Code with ♥ for github.com/JoeTheorium}//