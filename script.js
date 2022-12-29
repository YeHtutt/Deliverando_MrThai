let mainDishes = [ //die Gerichte des Restaurants 
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

let inBasketDishes = []; //Gerichte im Einkaufwagen

function render(){
    let dish = document.getElementById('restaurantDishes');
    dish.innerHTML = '';

    for (let i = 0; i < mainDishes.length; i++) {
        const elementMainDish = mainDishes[i];
        dish.innerHTML += `
        <div class="card" onclick="addToBasket(${i})">
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

function addToBasket(i){ //bestimmten Index von render() wurde per Klick ausgewählt
    let basketItem = mainDishes[i]; //dieses Element von Index wird an basketItem übergeben
    if(checkFoodInBasket(mainDishes[i])){
        basketItem['amount'] +=1;
    }
    else{
        basketItem['amount'] =1; //mind. ein Gericht wurde hinzugefügt
        basketItem['priceSum'] =0; //Zwischen Summe Berehnung nicht erforderlich, weil Anzahl-1 und der Preis angezeigt wird
        inBasketDishes.push(basketItem); //Einkaufswagen Array wird mit Auswahl Gericht hinzugefügt
        console.log('inBasketDishes')
    }
    renderBasket(); //Es zeigt am Ende Einkaufswagen an
}


function checkFoodInBasket(dishViaIndex){
    for (let i = 0; i < inBasketDishes.length; i++) {
        const elementValid = inBasketDishes[i];
        if(dishViaIndex['name'] == elementValid['name']) //prüft ob HauptGerichte Alle Auswahlindexe schon ein mal in Einkaufswagen-Array gibt
        {return true}; 
    }
}


function renderBasket(){
    let basket = document.getElementById('shoppingBasketContent');
    basket.innerHTML ='';
    for (let i = 0; i < inBasketDishes.length; i++) {
        const basketElement = inBasketDishes[i];
        basket.innerHTML += `
        <div class="baskeElementBorder">
            <div class="basketContent">
                <div>
                    <div>${basketElement['amount']}</div> x <div>${basketElement['name']}</div>    
                </div>
                <div>
                    <div>${basketElement['price'].toFixed(2)} €</div>
                </div>
            </div>
            <div class="adjustButtons">
                <button class="amountDecreaseBtn" onclick="decreaseAmount(${i}), renderBasket()">-</button>
                <button class="amountIncreaseBtn" onclick="increaseAmount(${i}), renderBasket()">+</button>
            </div>
        </div>
        `;
    }
}


