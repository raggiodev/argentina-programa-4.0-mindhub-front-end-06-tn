const { createApp } = Vue

const localAPI = "./assets/js/amazingEvents.json"

if (document.querySelector(".cards")) {
    document.querySelector(".cards").style.display = "none"
}

const app = createApp({
    data() {
        return {
            cards: [],
            allEvents: [],
            categories: [],
            checkbox: [],
            search: "",
            details: {},
            upcomingEventsByCategory: [],
            pastEventsByCategory: [],
            topAttendanceEvents: {},
            lowestAttendanceEvents: {},
            largerCapacityEvents: {},
        }
    },
    created() {
        fetch(localAPI)
            .then(res => res.json())
            .then(data => {
                if (document.title.includes("Upcoming Events")) {
                    this.cards = data.events.filter(event => event.date >= data.currentDate)
                }
                else if (document.title.includes("Past Events")) {
                    this.cards = data.events.filter(event => event.date < data.currentDate)
                }
                else {
                    this.cards = data.events
                }

                this.allEvents = this.cards
                this.categories = [...new Set(this.cards.map(e => e.category))]

                const queryString = location.search
                const params = new URLSearchParams(queryString)
                const id = params.get('id')
                const $div = document.querySelector(".details")

                this.details = this.cards.find(elem => elem._id == id)
                this.upcomingEventsByCategory = this.cards.filter(elem => { if (elem.estimate) { return elem } }).map(elem => elem = {
                    category: elem.category,
                    revenue: elem.price * elem.capacity,
                    attendance: elem.estimate / elem.capacity
                }).reduce((acc, elem) => {
                    const category = acc.find(e => e.category == elem.category);
                    if (category) {
                        category.revenue += elem.revenue;
                        category.attendance = (category.attendance + elem.attendance) / 2
                    }
                    else {
                        acc.push(elem)
                    }
                    return acc
                },
                    []);
                this.pastEventsByCategory = this.cards.filter(elem => {
                    if (elem.assistance) {
                        return elem
                    }
                }).map(elem => elem = {
                    category: elem.category,
                    revenue: elem.price * elem.capacity,
                    attendance: elem.assistance / elem.capacity
                }).reduce((acc, elem) => {
                    const category = acc.find(e => e.category == elem.category)
                    if (category) {
                        category.revenue += elem.revenue
                        category.attendance = (category.attendance + elem.attendance) / 2
                    }
                    else {
                        acc.push(elem)
                    }
                    return acc
                },
                [])

                let i1 = 0;
                let i2 = 0;
                let i3 = 0;

                function changeContent(array,td,index) {
                    document.getElementById(td).textContent = array[index]
                    return (index + 1) % array.length
                };

                setInterval(() => {
                    i1 = changeContent(this.topAttendanceEvents, `td1-${i1}`, i1)
                }, 3000);
                setInterval(() => {
                    i2 = changeContent(this.lowestAttendanceEvents, `td2-${i2}`, i2)
                }, 3000);
                setInterval(() => {
                    i3 = changeContent(this.largerCapacityEvents, `td3-${i3}`, i3)
                }, 3000);
            })
            .catch(error => console.log(error))
            .finally(() => {
                document.querySelector(".cards").style.display = "flex"
            });
    },
    computed: {
        filtro() {
            return this.allEvents.filter(elem =>
                (this.checkbox.includes(elem.category) || this.checkbox.length === 0) && elem.name.toLowerCase().includes(this.search.toLowerCase().trim())
            );
        },
    },
});

app.mount('#app');