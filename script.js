let mainDishes = [
    {
        "name": "Gebratene Nudeln",
        "description": "Wahl aus: vegetarisch || Entenfleisch || Ganelen || Hühnerfleisch und mehr",
        "price": 10.00,
    },
    {
        "name": "Popia (8 Stück vegetarisch)",
        "description": "Frühlingsrollen",
        "price": 4.60,
    },
    {
        "name": "Gebratener Reis",
        "description": "Wahl aus: vegetarisch || Entenfleisch || Ganelen || Hühnerfleisch und mehr",
        "price": 10.00,
    },
    {
        "name": "Tom Yum Suppe (sauer-scharf)",
        "description": "Wahl aus: Ganelen || Hühnerfleisch || Rindfleisch",
        "price": 5.50,
    },
    {
        "name": "Tom Kha (scharf mit Kokosmilch)",
        "description": "Wahl aus: Ganelen || Hühnerfleisch || Rindfleisch",
        "price": 5.50,
    },
    {
        "name": "Kroepoek",
        "description": "Krabbenchips",
        "price": 3.80,
    },
    {
        "name": "Thai Glasnudelsalat (pikant)",
        "description": "mit frischen Tomaten, Morcheln, Zwiebeln, Paprika, Gurken, Koriander und Fleisch nach Wahl",
        "price": 10.40,
    },
    {
        "name": "Foodrockers Salat",
        "description": "gemischter Salat mit Rindfleisch, Kirchtomaten, Gurken, Paprika und Mais",
        "price": 12.40,
    }
];


function render(){
    let dish = document.getElementById('restaurantDishes');
    dish.innerHTML = '';

    for (let i = 0; i < mainDishes.length; i++) {
        const elementMainDish = mainDishes[i];
        dish.innerHTML += `
        <div class="card" onclick="addToBasket${i}">
            <div class="cardLeftCorner">
                <h3>${elementMainDish['name']}</h3>
                <p>${elementMainDish['description']}</p>
            </div>

            <div class="cardRightCorner">
                <p>${elementMainDish['price'].toFixed(2)} €</p>
            </div>
        </div>
        `;
    }
}





