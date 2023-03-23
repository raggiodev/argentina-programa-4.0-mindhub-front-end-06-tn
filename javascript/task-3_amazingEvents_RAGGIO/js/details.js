import data from '../js/data.js';

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const card = data.events.find(card => card._id == id);

const fragment = document.createDocumentFragment();

const $div = document.getElementById("details");
$div.innerHTML = `
    <div>
        <span style="background-image: url("${card.image}");"></span>
        <div>
            <h1>${card.name}</h1>
            <h3>Date: ${card.date}</h3>
            <p>${card.description}</p>
            <h3>Category: ${card.category}</h3>
            <h3>Place: ${card.place}</h3>
            <p>Capacity: ${card.capacity}</p>
            <p>Estimate: ${card.estimate}</p>
            <p>Price: $${card.price}</p>
        </div>
    </div>
`
// $div.appendChild(fragment);