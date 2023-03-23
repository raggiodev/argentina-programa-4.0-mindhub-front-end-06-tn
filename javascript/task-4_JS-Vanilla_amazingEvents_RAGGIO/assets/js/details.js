let localAPI = '../assets/js/amazingEvents.json';

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get('id')
const $div = document.querySelector(".details")

async function fetchLocalAPI() {
    try {
        const response = await fetch(localAPI);
        const data = await response.json();

        let event = data.events.map(e => {
            if (e.assistance) {
                return e
            }
            else {
                return { ...e, assistance: e.estimate }
            }
        });

        const card = event.find(card => card._id == id)

        $div.innerHTML = `
            <div class="container-fluid bg-primary.bg-gradient d-flex justify-content-center">
                <img class="card-img" style="background-image: url("${card.image}");"></img>
                <div class="text-light">
                    <h1 class="card-title">${card.name}</h1>
                    <h3>Date: ${card.date}</h3>
                    <p class="card-description">${card.description}</p>
                    <h3>Category: ${card.category}</h3>
                    <h3>Place: ${card.place}</h3>
                    <p>Capacity: ${card.capacity.toLocaleString()}</p>
                    <p>Assistance or Estimate:  ${card.assistance.toLocaleString()}</p>
                    <p>Price: $${card.price}</p>
                </div>
            </div>
        `
    }
    catch (error) {
        console.log(error)
    }
}
fetchLocalAPI();