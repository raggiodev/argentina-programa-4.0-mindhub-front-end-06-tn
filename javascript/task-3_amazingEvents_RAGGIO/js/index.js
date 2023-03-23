// Importo array de objetos otorgado por los mentores de "MindHub" para el proyecto
import data from '../js/data.js';

// Creo fragmento para agregar elementos de forma eficiente al DOM
const fragment = document.createDocumentFragment();

// Selecciono el contenedor para las cards de eventos
let cards = document.getElementById("cards-js");

// Creo cards y las agrego al DOM. Esta es la forma dinámica con JS
function createCards(events, section) {
  // Limpio el contenido del contenedor de las cards
  cards.innerHTML = "";
  // Itero sobre cada evento y agrego una card en el contenedor, iteración por iteración
  for (let newcard of events) {
    section.innerHTML += `
      <article class="card bg-dark text-light cards-fix">
        <img src="${newcard.image}" class="card-img-top" alt="Amazing Events">
        <div class="card-body d-flex flex-column justify-content-between">
          <h4 class="card-title">${newcard.name}</h4>
          <p class="card-text">${newcard.description}</p>
          <div class="d-flex justify-content-between align-items-center gap-3">
            <p>Price $${newcard.price}</p>
            <a class="btn btn-primary" href="./pages/details.html">Go to event</a>
          </div>
        </div>
      </article>
    `;
  }
  // Agrego el fragmento al DOM. Con esto mejoro el rendimiento general de la página
  section.appendChild(fragment);

  // Muestro un mensaje genérico si el user NO encuentra ningún evento escribiendo en el "input" del "Search"
  if (events.length === 0) {
    let messageSection = document.createElement("section");
    messageSection.className = "container-fluid d-flex flex-wrap justify-content-center align-items-center gap-4 cards-fix text-white";
    messageSection.innerHTML += `
      <h2>No event found</h2>
    `;
    fragment.appendChild(messageSection);
    section.appendChild(fragment);
  }
}

// Llamo a la función "createCards" con los eventos y el contenedor de las cards
createCards(data.events, cards);

// Obtengo las categorías de los eventos y creo los filtros
let arrayCategories = data.events.map(e => e.category).reduce((acc, category) => { // Uso "e" como nombre de parámetro que se refiere a un evento, por ser la inicial de "event". Esto suele hacerse mucho
  if (!acc.includes(category)) {
    acc.push(category)
  }
  return acc;
},
[]);

// Obtengo el contenedor de los filtros
const $categories = document.getElementById('categories');
const fragment2 = document.createDocumentFragment();
// Creo los elementos HTML
for (let category of arrayCategories) {
  let $label = document.createElement("label");
  $label.textContent = category;
  $label.setAttribute("for", category);
  $label.setAttribute("class", "form-check-label text-light");
  let $input = document.createElement("input");
  $input.setAttribute("type", "checkbox");
  $input.setAttribute("name", category);
  $input.setAttribute("id", category);
  $input.setAttribute("class", "form-check-input");
  fragment2.appendChild($input);
  fragment2.appendChild($label);
}

// Agrego al DOM los elementos HTML de los filtros
$categories.appendChild(fragment2);

// Creo una copia de los eventos para aplicar los filtros
let filters = data.events.slice();

// Filtro los eventos por categoría
function filterByCategory(array, text) {
  return array.filter(e => e.category.toLowerCase() === text.toLowerCase());
}

// Agrego un "change event"
$categories.addEventListener("change", function () {
  let $checkbox = $categories.getElementsByTagName("input");
  let selectedCategories = [];

  // Reinicio la búsqueda de texto
  $search.value = "";

  // Recopilo categorías seleccionadas
  for (let i = 0; i < $checkbox.length; i++) {
    if ($checkbox[i].checked) {
      selectedCategories.push($checkbox[i].id.toLowerCase());
    }
  }
  // Filtro eventos según categorías seleccionadas
  if (selectedCategories.length > 0) {
    filters = data.events.filter((event) =>
      selectedCategories.includes(event.category.toLowerCase())
    );
  } else {
    filters = data.events.slice();
  }
  // Creo cards con eventos filtrados
  createCards(filters, cards);
});

// Filtro eventos por keyword (palabra clave)
function filterByKeyword(array, keyword) {
  let filteredCategories = array.filter((e) =>
    e.name.toLowerCase().includes(keyword.toLowerCase())
  );
  return filteredCategories;
}

// Obtengo "input" de búsqueda
const $search = document.getElementById("search");

// Agrego evento de búsqueda
$search.addEventListener("input", function (e) { // Uso "input" dado que es más práctico y "user friendly" que "keyup"
  const keyword = e.target.value.trim();
  let filters2 = filters; // - CINTHYA y/o LUCAS: ES NECESARIO HACER "filters2"? PUEDO SIMPLEMENTE UTILIZAR "filters"? POR FAVOR, RESPONDÁNME EN EL FEEDBACK DE LA "Task 3". Gracias! -

  if (keyword.length > 0) {
    filters2 = filterByKeyword(filters, keyword);
  }
  // Creo cards con eventos filtrados por keyword
  createCards(filters2, cards);
});

// Obtengo formulario de búsqueda
const $searchForm = document.getElementById("searchForm"); // Con esto también evito que al enviar una búsqueda, me redireccione a "Cannot GET /amazingevents_RAGGIO/nothing"

// Agrego evento de envío de search form
$searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const keyword = $search.value.trim();
  let filters2 = filters;

  if (keyword.length > 0) {
    filters2 = filterByKeyword(filters, keyword);
  }

  // Creo cards con eventos filtrados por keyword
  createCards(filters2, cards);
});

// Exporto función "createCards"
export default createCards;





// DOCUMENTACIÓN

// Este código JavaScript nos permite filtrar eventos por categoría o por palabra clave.
// Además, podemos ver los eventos disponibles y hacer "click" en el botón para ir a los detalles de cada uno.

// En primer lugar, se importa un archivo con la información de los eventos que se van a mostrar.
// Después, se crea un fragmento de documento, que se utiliza para agregar elementos al DOM (el árbol de objetos que representa la estructura de una página web).
// Se definen dos funciones principales, una para crear las tarjetas de eventos y otra para filtrarlos.
// La función "createCards" toma como argumento un array de eventos y un contenedor donde se van a mostrar.
// Esta función vacía el contenido del contenedor y, a continuación, recorre el array de eventos para agregar una tarjeta por cada uno.
// Cada tarjeta se crea como un elemento article con una imagen, un título, una descripción, un precio y un botón que lleva a los detalles del evento.
// Por último, si NO hay eventos disponibles, se muestra un mensaje que indica que NO se encontraron eventos.
// La función "filterByCategory" toma como argumento un array de eventos y un texto que indica la categoría que se quiere filtrar.
// Esta función filtra el array de eventos para devolver solo aquellos que pertenecen a la categoría que se especificó.
// En el siguiente bloque de código, se obtienen las categorías únicas de los eventos y se crean elementos de formulario (etiquetas y casillas de verificación) para cada una de ellas.
// Luego, se agregan estos elementos al DOM. Después, se define una variable filters que es una copia del array de eventos.
// Esto es necesario para que la función de búsqueda NO afecte al array original.
// La función "filterByKeyword" filtra los eventos por palabra clave, tomando como argumento el array de eventos y la palabra clave.
// Devuelve un array con los eventos que coinciden con la palabra clave.
// A continuación, se define una variable "$search" que hace referencia al campo de entrada de búsqueda en el formulario.
// Se agregan dos escuchadores de eventos a este campo, uno para escuchar cambios en el valor del campo y otro para escuchar envíos del formulario.
// Cada vez que se escribe algo en el campo de búsqueda, se llama a la función "filterByKeyword" con los filtros actuales y la palabra clave escrita.
// La nueva lista de eventos filtrados se pasa a la función "createCards" para que se muestren en la página.
// Finalmente, cuando se envía el formulario, se llama a la función "filterByKeyword" con los filtros actuales y la palabra clave escrita, y se muestra la lista de eventos filtrados.
// Por último, se exporta la función "createCards".