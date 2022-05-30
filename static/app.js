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



});