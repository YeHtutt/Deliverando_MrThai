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
let totalvarForHomepage = 0;


function render() {
    let dish = document.getElementById('restaurantDishes');
    dish.innerHTML = '';

    for (let i = 0; i < mainDishes.length; i++) {
        const elementMainDish = mainDishes[i];
        dish.innerHTML += htmlMainDish(elementMainDish, i);
    }
}

function htmlMainDish(elementMainDish, i) {
    return `
    <div class="card">
    <div class="cardLeftCorner">
        <h3>${elementMainDish['name']}</h3>
        <p>${elementMainDish['description']}</p>
    </div>

    <div class="cardRightCorner">
        <div onclick="addToBasket(${i})">
            <button>+</button>
        </div>
        <div>
            <p>${elementMainDish['price'].toFixed(2)} €</p>
        </div>
    </div>
    </div>
    `;
}



function addToBasket(i) { //bestimmten Index von render() wurde per Klick ausgewählt
    let basketItem = mainDishes[i]; //dieses Element von Index wird an basketItem übergeben
    if (checkFoodInBasket(mainDishes[i])) {
        basketItem['amount'] += 1;
    }
    else {
        basketItem['amount'] = 1; //mind. ein Gericht wurde hinzugefügt
        basketItem['priceSum'] = 0; //Zwischen Summe Berehnung nicht erforderlich, weil Anzahl-1 und der Preis angezeigt wird
        inBasketDishes.push(basketItem); //Einkaufswagen Array wird mit Auswahl Gericht hinzugefügt
        console.log('inBasketDishes')
    }
    renderBasket(); //Es zeigt am Ende Einkaufswagen an
}


function checkFoodInBasket(dishViaIndex) {
    for (let i = 0; i < inBasketDishes.length; i++) {
        const elementValid = inBasketDishes[i];
        if (dishViaIndex['name'] == elementValid['name']) //prüft ob HauptGerichte Alle Auswahlindexe schon ein mal in Einkaufswagen-Array gibt
        { return true };
    }
}


function renderBasket() { //Alle Elemente im Einkaufswagen zeigen
    let basket = document.getElementById('shopingBasketContainer'); //ShopingBasketContainer
    basket.innerHTML = '';
    checkBasketStatus(); 
    for (let i = 0; i < inBasketDishes.length; i++) {
        const basketElement = inBasketDishes[i]; //einzelne im Einkaufwagen Elemente werden Index für Index an leeres Element zugewiesen
        basket.innerHTML += htmlBasket(basketElement,i);
    }
    updateBasketTotalSum();
    showTotalPriceOnHomeScreen();
}

function htmlBasket(basketElement, i){
    return `
    <div class="baskeElementBorder">
        <div class="basketContent">
            <div>
                <div>${basketElement['amount']}</div> x <div>${basketElement['name']}</div>    
            </div>
            <div>
                <div>${calculateDish(basketElement).toFixed(2)} €</div>
            </div>
        </div>
        <div class="adjustButtons">
            <button class="amountDecreaseBtn" onclick="decreaseAmount(${i}), renderBasket()">-</button>
            <button class="amountIncreaseBtn" onclick="increaseAmount(${i}), renderBasket()">+</button>
        </div>
    </div>
    `;
}


function calculateDish(basketElement) { //Berechnung für ZwischenSumme von bestimmten Array Index(Zeile)
    basketElement['priceSum'] = +basketElement['amount'] * +basketElement['price']; //dabei wird die ZwischenSumme in die ZwischenSum. Spalte['priceSum'] des EinkaufswagenArray gespeichert
    return basketElement['priceSum']; //Zwischen Summe wird zurückgegeben
}

function updateBasketTotalSum() {
    let subTotal = 0; //ZwischenSumme
    let total = 0;       //Summe
    for (let i = 0; i < inBasketDishes.length; i++) {
        const element = inBasketDishes[i]; //einzelne im Einkaufwagen Elemente werden Index für Index an leeres Element zugewiesen
        subTotal += calculateDish(element); //dieses Element Spalte ['priceSum'] wird zurückgegeben und wird jedes mal mit Zwischensumme addiert
    }
    if (subTotal <= 25) { //Wenn ZwischenSumme unter 25 Euro ist
        total = 4 + subTotal; //hier wird ZwischenSum. mit Lieferkosten adddiert
    } else {
        total += subTotal; //über 25 Euro kostenlose Lieferung  
    }
    document.getElementById('subTotal').innerHTML = subTotal.toFixed(2); //in seinen Container Ergebnis rein schreiben
    document.getElementById('total').innerHTML = total.toFixed(2); //in seinen Container Ergebnis rein schreiben
    totalvarForHomepage =total.toFixed(2);
    console.log(`${totalvarForHomepage}`);
}


function increaseAmount(i) { //beim dem ausgewählten JSON-Index wird beim klicken die Anzahl-Spalte des Array inkrementiert
    inBasketDishes[i]['amount'] += 1;
    renderBasket(); //Elemente im Einkaufswagen zeigen
}

function decreaseAmount(i) { //beim dem ausgewählten JSON-Index wird beim klicken die Anzahl-Spalte des Array dekrementiert
    inBasketDishes[i]['amount'] -= 1;
    if (inBasketDishes[i]['amount'] == 0) { //Wenn Anzahl ist 0, dann JSON-Array selektierten Index Array-Element aus Einkaufswagen löschen
        inBasketDishes.splice(i, 1);
    }
    renderBasket(); //Elemente im Einkaufswagen zeigen
}


function checkBasketStatus() { //hier Seite Einkaufswagen wird vom Leer zu den Inhalte geändert
    if (inBasketDishes.length != 0) { //Wenn irgendwas schon vom Restaurant gewählt ist
        document.getElementById('emptyBasket').classList.add('d-none');
        document.getElementById('basketInvoiceContent').classList.remove('d-none');
    }
    else {
        document.getElementById('emptyBasket').classList.remove('d-none');
        document.getElementById('basketInvoiceContent').classList.add('d-none');
    }
}

function order() {
    inBasketDishes.splice(0, inBasketDishes.length);//Einkaufswagen Array wird komplett gelöscht
    renderBasket(); //Elemente im Einkaufswagen zeigen
}


function showBasket() { //Einkaufswagen anzeigen
    document.getElementById('body').classList.add('no-scroll');
    document.getElementById('leftContent').classList.add('d-none');
    checkBasketStatus();
    document.getElementById('rightShoppingCart').classList.add('oparcity_Full');
    document.getElementById('showBasketButton').classList.add('d-none');
    document.getElementById('showBasketTotalPrice').classList.add('d-none');
    console.log('show');
}

function closeBasket() {  //Schließt Auswahlseite beim Klicken Homebutton
    document.getElementById('leftContent').classList.remove('d-none');
    checkBasketStatus();
    document.getElementById('rightShoppingCart').classList.remove('oparcity_Full');
    document.getElementById('rightShoppingCart').style = 'oparcity: 0;';
    document.getElementById('showBasketButton').classList.remove('d-none');
    document.getElementById('body').classList.remove('no-scroll');
    document.getElementById('showBasketTotalPrice').classList.remove('d-none');
    console.log('dontshow');
}

function showTotalPriceOnHomeScreen(){
    document.getElementById('showBasketTotalPrice').innerHTML = 'Gesamt: ' + totalvarForHomepage + ' €'; //die Zeile wird aufgerufen, sobald sich im Warenkorb was ändert
    if (inBasketDishes == 0){  
        document.getElementById('showBasketTotalPrice').innerHTML = '';
    }
}
