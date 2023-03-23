import data from '../js/data.js';

const futureData = data.events.filter(e => e.date<=data.currentDate);

const fragment = document.createDocumentFragment();

let cards = document.getElementById("cards-js");

function createCards(events, section) {
    cards.innerHTML = "";
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
    section.appendChild(fragment);

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

createCards(futureData, cards);

let arrayCategories = futureData.map(e => e.category).reduce((acc, category) => {
    if (!acc.includes(category)) {
        acc.push(category)
    }
    return acc;
},
[]);

const $categories = document.getElementById('categories');
const fragment2 = document.createDocumentFragment();

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

$categories.appendChild(fragment2);

let filters = futureData.slice();

function filterByCategory(array, text) {
    return array.filter(e => e.category.toLowerCase() === text.toLowerCase());
}

$categories.addEventListener("change", function () {
    let $checkbox = $categories.getElementsByTagName("input");
    let selectedCategories = [];

    $search.value = "";

    for (let i = 0; i < $checkbox.length; i++) {
        if ($checkbox[i].checked) {
            selectedCategories.push($checkbox[i].id.toLowerCase());
        }
    }
    if (selectedCategories.length > 0) {
        filters = futureData.filter((event) =>
            selectedCategories.includes(event.category.toLowerCase())
        );
    } else {
        filters = futureData.slice();
    }
    createCards(filters, cards);
});

function filterByKeyword(array, keyword) {
    let filteredCategories = array.filter((e) =>
        e.name.toLowerCase().includes(keyword.toLowerCase())
    );
    return filteredCategories;
}

const $search = document.getElementById("search");

$search.addEventListener("input", function (e) {
    const keyword = e.target.value.trim();
    let filters2 = filters;

    if (keyword.length > 0) {
        filters2 = filterByKeyword(filters, keyword);
    }
    createCards(filters2, cards);
});

const $searchForm = document.getElementById("searchForm");

$searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const keyword = $search.value.trim();
    let filters2 = filters;

    if (keyword.length > 0) {
        filters2 = filterByKeyword(filters, keyword);
    }

    createCards(filters2, cards);
});