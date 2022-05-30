$(document).ready(function(){
    function showResponse(id_Div, resp){
        let $div_response = $(`#${id_Div}`);
        $div_response.append(`<p>${resp}</p>`);
    }

    // Part 1: Number Facts
    // 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number
    let div_show_1_1 = "part_1_1";
    let numberFactsURL = "http://numbersapi.com/random";
    let numberFactsPromise = axios.get(numberFactsURL);
    
    numberFactsPromise
        .then(resp => showResponse(div_show_1_1, resp.data))
        .catch(err => showResponse(div_show_1_1, err));


    // 2. Figure out how to get data on multiple numbers in a single request.
    // Make that request and when you get the data back, put all of the number facts on the page
    let div_show_1_2 = "part_1_2";
    let num_start = parseInt(Math.random() * 100);
    let num_end = num_start + 4;

    let multipleNumbersURL = `http://numbersapi.com/${num_start}..${num_end}`;
    let multipleNumbersPromise = axios.get(multipleNumbersURL);
    
    multipleNumbersPromise
        .then(resp => {
            for(var key in resp.data){
                showResponse(div_show_1_2, resp.data[key])
            }
        })
        .catch(err => showResponse(div_show_1_2, err));


    // 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
    // It’s okay if some of the facts are repeats.    
    let div_show_1_3 = "part_1_3";
    let getFactsURL = "http://numbersapi.com/random";
    let getFactsPromise = [];

    for (let i = 1; i < 5; i++){
        getFactsPromise.push(axios.get(getFactsURL));
    }
        
    Promise.all(getFactsPromise)
        .then(getFactsArr => (
            getFactsArr.forEach(resp => showResponse(div_show_1_3, resp.data))
        ))
        .catch(err => showResponse(div_show_1_3, err));


    // Part 2: Deck of Cards
    // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
    // Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
    let div_show_2_1 = "part_2_1";
    let pickCardURL = "http://deckofcardsapi.com/api/deck/new/draw/?count=1";
    let pickCardPromise = axios.get(pickCardURL);

    pickCardPromise
        .then(resp => {
            let card_data = `${resp.data.cards[0].value} ${resp.data.cards[0].suit}`;
            showResponse(div_show_2_1, card_data);
            console.log(card_data);
        })
        .catch(err => showResponse(div_show_2_1, err));


    // 2. Figure out how to get data on multiple numbers in a single request. 
    // Make that request and when you get the data back, put all of the number facts on the page.
    // Once you have both cards, console.log the values and suits of both cards
    let div_show_2_2 = "part_2_2";
    let pickCardsURL = "http://deckofcardsapi.com/api/deck/new/draw/?count=1";
    let pickCardsPromise = axios.get(pickCardsURL);

    pickCardsPromise
        .then(resp_1 => {
            let card_1_data = `${resp_1.data.cards[0].value} ${resp_1.data.cards[0].suit}`;
            showResponse(div_show_2_2, card_1_data);
            console.log(card_1_data);
            let deck_id = resp_1.data.deck_id;
            return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
        })
        .then(resp_2 => {
            let card_2_data = `${resp_2.data.cards[0].value} ${resp_2.data.cards[0].suit}`;
            showResponse(div_show_2_2, card_2_data);
            console.log(card_2_data);
        })
        .catch(err => showResponse(div_show_2_2, err));


    // 3. Build an HTML page that lets you draw cards from a deck. 
    // When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
    // Every time you click the button, display a new card, until there are no cards left in the deck.
    let deck_id = "new";
    let z_index_pos = 1;
        
    function appendCard(card_image_url){      
        let $div_cards = $("#deck_cards");
        let rotate_deg = Math.floor((Math.random() * (45 - (-45) + 1)) + (-45));
        let padding_card = Math.floor((Math.random() * (70 - 50 + 1)) + 50);
        $div_cards.append(`<div class="div_card" style="z-index:${z_index_pos}; padding-top:${padding_card}px;"><img src="${card_image_url}" style="transform: rotate(${rotate_deg}deg);"></div>`);
        z_index_pos += 1;
    }
    $("#get_card_button").on("click", function(){
        let pickCardURL = `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
        let pickCardPromise = axios.get(pickCardURL);

        pickCardPromise
            .then(resp => {
                appendCard(resp.data.cards[0].image);
                deck_id = resp.data.deck_id;
                if(resp.data.remaining == 0){
                    $("#get_card_button").remove();
                }
            })
            .catch(err => console.log(err));
    });

});