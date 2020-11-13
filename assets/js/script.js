

var chosenCity = $("#chosenCity")
var chosenCityTitle = $("#chosenCityTitle")
var chosenCityTemp = $("#chosenCityTemp")
var chosenCityHumid = $("#chosenCityHumid")
var chosenCityWind = $("#chosenCityWind")
var chosenCityUV = $("#chosenCityUV")
var UVindexPlaceHolder = $("#UVindexPlaceHolder")

// remove after logic formed
var chosenCity

var APIkey = "93048a14e536394603a5f5173a41d761"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

//  Current weather information
function ajaxRetrieval() {

    chosenCity = $("#cityName").val()
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        console.log(response)
        var temp = ((response.main.temp) - 273.15) * 1.8 + 32
        var long = parseInt(response.coord.lon)
        var lat = parseInt(response.coord.lat)

        chosenCityTitle.text(response.name + "  -  " + moment().format("MMM Do YYYY"))
        chosenCityTemp.text("Temperature: " + temp.toFixed(2) + "℉")
        chosenCityHumid.text("Humidity: " + response.main.humidity + "%")
        chosenCityWind.text("Wind speed: " + response.wind.speed + " mph")

        var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIkey;

        $.ajax({ url: UVIndexURL, method: "GET" }).then(function (newResponse) {
            console.log(newResponse)
            UVindexPlaceHolder.text("UV Index:")
            chosenCityUV.text(newResponse.value)
            if (parseInt(newResponse.value) < 3) {
                chosenCityUV.attr("style", "background-color: green")
            } else if (parseInt(newResponse.value) < 5) {
                chosenCityUV.attr("style", "background-color: yellow")
            } else if (parseInt(newResponse.value) < 8) {
                chosenCityUV.attr("style", "background-color: orange")
            } else if (parseInt(newResponse.value) < 10) {
                chosenCityUV.attr("style", "background-color: red")
            } else if (parseInt(newResponse.value) >= 10) {
                chosenCityUV.attr("style", "background-color: fuscia")
            } else {
                chosenCityUV.attr("style", "background-color: black")
            }
        });

    });
}

//  search input
//  $("#cityName").val()  grabs the value inside the text area
$("#citySubmit").on("click", function (event) {
    event.preventDefault();
    ajaxRetrieval();
})

$("#cityName").on("keypress", function (event) {
    if (event.which == 13 && !event.shiftKey) {
        event.preventDefault();
        ajaxRetrieval();
    }
});

//  Button saving

//  outputting to chosen city

//  List of cities on local storage

//  create the chosen city card when an input is put in
function localStorageCities() {

}

//  generate 5 cards for 5 day forecast
function fiveDayGen() {
    for (let i = 0; i < 5; i++) {


    }
}

