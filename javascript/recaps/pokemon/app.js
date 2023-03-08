// importo datos
import data from './data.js'

// seleccionamos 3 HTML elements que usaremos después
let $container = document.getElementById('container')
let $selectContainer = document.getElementById('select-container')
let $search = document.getElementById("search")

// Func. para limpiar el contenedor c/v que ejecuto la misma y por c/obj de poke en el array creo un html element y lo añado al container
const crearPokemones = (array, container) => { 
    container.innerHTML = "" // para limpiar el contenedor cada vez que ejecutamos la función
    if (array.length < 1) { // si el array está vacío, agregamos el mensaje de que no se encontró ningún Pokemon
        let mensaje = document.createElement('p')
        mensaje.textContent = "No se encontró ningún Pokemon :("
        mensaje.style.fontWeight = "600"
        mensaje.style.color = "black"
        container.appendChild(mensaje)
    } else { // si hay elementos en el array, creamos los elementos HTML de los pokemones
        array.forEach(pokemon => {
            /* name✅, hp, defense✅, attack✅, type[0] */
            let card = document.createElement('div')
            card.className = `pokemon-card ${pokemon.name.toLowerCase()}`
            card.innerHTML = `
                <h4>Nombre: ${pokemon.name}</h4>
                <p>Tipo: ${pokemon.type[0]}</p>
                <img src="${pokemon.img}" alt="${pokemon.name}"/>
                <div class="flex between">
                    <p>Vida: ${pokemon.hp}%</p>
                    <p>Ataque: ${pokemon.attack}</p>
                    <p>Defensa: ${pokemon.defense}</p>
                </div>
            `
            // Antigua img base: <img src="https://cf.geekdo-images.com/V9pkzNgoXitxhCjLhOKkPA__itemrep/img/4M61kAEyEc9VW9MvKQTCtpw3PZA=/fit-in/246x300/filters:strip_icc()/pic1807805.jpg" alt="${pokemon.name}"/>
            container.appendChild(card)
        })
    }
}

crearPokemones(data, $container) // "data" es el array con la info de los pokes, no olvidar y "container" donde se mostraran

const filtrarSearch = (array, value) => { // Esta func. filtra array y devuelve nuevo array con los pokes que tengan lo escroto por el user
    /* array es la lista de pokes, value lo que pone el usuario  */
    let filteredArray = array.filter(pokemon => pokemon.name.toLowerCase().includes(value.toLowerCase().trim()))
    //trim saca los espacios de antes y despues de que empiecen los caracteres
    
    return filteredArray
}

const generarTipos = (array) => { // parám. "array" = info pokes!
    let arrayTipos = array.map(pokemon => pokemon.type[0])
    let tiposFiltrados = [...new Set(arrayTipos)]
    return tiposFiltrados
} //vamos a devolver/retornar un array con los tipos que existen de los pokemones. Creo new array y lo filtra para que no haya repetidos. dsps devuelve el array de tipos filtrado.

let tipos = generarTipos(data) // Llamada a la func. "generarTipos" con el parám. "data" y guardo su resultado en "tipos"

const pintarSelect = (array, container) => { // Creo menú despñlegable con c/type poke que está en el array y lo agrega al container que es donde está todo el DOM

    let select = document.createElement('select')
    let option = document.createElement('option')

    option.setAttribute('value', "") /* seteamos el valor de "selecciona tu poke" en string vacio */
    option.textContent = "Selecciona tu Pokemon"
    select.appendChild(option)

    array.forEach(tipo => { // itero. p c/t pokemon creo nuevo "option" element
        let option = document.createElement('option')
        option.setAttribute('value', tipo.toLowerCase())
        option.textContent = tipo
        select.appendChild(option) // agrego c/option al select
    })

    container.appendChild(select) // agrego el "select" completito al container element
}

pintarSelect(tipos, $selectContainer) // llamo a la func. encargada de pintar el menu en el html element $selectContainer
let $select = document.getElementsByTagName("select")[0]; // selecciona "select" del HTML y lo asigna a la var(let) "$select". // Esta let se usrá para capturar el valor que seleccione el usuario seguí en insta a Seba y a Fer (perdón(?)


const filtrarSelect = (array, value) => { // array pokes y el "value" es el tipo de poke seleccionado por el querido user en el menú desplegable
    let filteredArray = array.filter(pokemon => pokemon.type[0].toLowerCase().includes(value.toLowerCase())) // contiene los pokes cuyo tipo en pos.0 incluya el valor seleccionao por user. También le ponemos todo en mayúsculas para realizar comparación de strings sin importar mayus o minus

    if (filteredArray.length < 1) { // Filtro array del poke y traigo solo los pokes que coincidan en el tipo seleccionado
        return array // devuelve el array original si no encuentra ningún poke coincidente
    }
    return filteredArray // si hay al menos 1, se devuelve el array con los pokes filtrados
}

const filtroCruzado = (array) => { // filtra los resultados en función de lo que el usuario seleccionó en el menú desplegable y/o lo que haya escrito en el input (campo de búsqueda)
    let nuevoArray = filtrarSelect(array, $select.value) // primero filtra array según tipo seleccionado en menú desplegable (select). Queda solo con los pokes cuyo primer tipo coincida con el tipo seleccionado
    nuevoArray = filtrarSearch(nuevoArray, $search.value) // filtra aún más según lo que se escribió en el input
    return nuevoArray // devuelve array con results. filtrados
}

let arrayFiltrado = filtroCruzado(data) // almacena resultado del filtro del array "data" según los valores seleccionados en el menú desplegable y/o en la búsqueda en el input. Entonces "arrayFiltrado" es el array de objs. filtrado que se usa para mostrar los resultados actualizados en la pág. web

$search.addEventListener('input', (e) => { // evento de escucha que detecta cuando el user escribe algo o pega algo en el input (input >>> keyup)
    arrayFiltrado = filtroCruzado(data) // actualiza la variable "arrayFiltrado" con los results. del filtrado CRUZADO, esto utilizando las funciones "filtrarSelect" y "filtrarSearch"
    crearPokemones(arrayFiltrado, $container) // actualiza el viewport con los resultados del "arrayFiltrado" filtrado(? usando la func. "crearPokemones" para mostrar las cards de los pokes en el container 
})

// evento de cambio al DOM element "$selectContainer" que es nada mas y nada menos y nada mas que el contenedor del menú desplegable que se creó antes, te acordas que te dije?? presta atención che
$selectContainer.addEventListener('change', (e) => { // user selecciona tipo en menu y dispara event "change" y este ejecuta la func. callback que pasa como 2° argumento a este method
    arrayFiltrado = filtroCruzado(data) // func. callback actualiza array filtrado llamando a la func. "filtroCruzado"
    crearPokemones(arrayFiltrado, $container) // después llama a la func. "crearPokemones" para volver a renderizar/pintar los pokes filtrados en el container ($container)
}) // En resumen, estas lines of codes permiten que el user filtre los pokes por tipo seleccionando una opción en el menú desplegable menú desplegable menú desplegable menú desplegablemenú desplegable.
