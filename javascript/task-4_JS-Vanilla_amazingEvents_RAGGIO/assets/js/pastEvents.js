import functions from "./functions.js";

let localAPI = "../assets/js/amazingEvents.json";

let allEvents = [];
let categories = [];

async function fetchLocalAPI() {
    try {
        const response = await fetch(localAPI)
        const data = await response.json()

        allEvents = data.events.filter(e => e.date < data.currentDate)

        filterData = allEvents
        filterData2 = filterData

        categories = functions.createCategories(allEvents)
        functions.createCheckboxes(categories,$categories)

        functions.createCards(filterData,"template","cards")
    }
    catch (error) {
        console.log(error)
    }
};
fetchLocalAPI();

let filterData = allEvents;
let filterData2 = filterData;

const $categories = document.getElementById("categories");

$categories.addEventListener("change",function () {
    let $checkbox = $categories.getElementsByTagName("input")
    let txt = ""

    for (let i = 0; i < $checkbox.length; i++) {
        if ($checkbox[i].checked) {
            txt += $checkbox[i].id.toLocaleLowerCase()
        }
    }

    if (!txt == "") {
        filterData = functions.filterByCategory(allEvents,txt)
    }
    else {
        filterData = allEvents
    }

    filterData2 = functions.filterByKeyword(filterData,$search.value)
    functions.createCards(filterData2,"template","cards")
});

const $search = document.getElementById("search");
$search.addEventListener("input",function (e) {
    if (e.key === "Escape") {
        $search.value = ""
        filterData2 = filterData
    }

    filterData2 = functions.filterByKeyword(filterData,$search.value)
    functions.createCards(filterData2,"template","cards")
});

const $searchForm = document.getElementById("searchForm");
$searchForm.addEventListener("submit",function (e) {
    e.preventDefault()
    functions.createCards(filterData2,"template","cards")
});