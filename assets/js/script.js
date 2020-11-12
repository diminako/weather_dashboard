

var chosenCity = $("#chosenCity")
var chosenCityTitle = $("#chosenCityTitle")
var chosenCityTemp = $("#chosenCityTemp")
var chosenCityHumid = $("#chosenCityHumid")
var chosenCityWind = $("#chosenCityWind")
var chosenCityUV = $("#chosenCityUV")

// remove after logic formed
var chosenCity

var APIkey = "93048a14e536394603a5f5173a41d761"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;


$.ajax({ url: queryURL, method: "GET" }).then(function (response) {
    // Create CODE HERE to Log the queryURL
    console.log(queryURL)
    // Create CODE HERE to log the resulting object
    console.log(response)

});

function ajaxRetrieval() {

    chosenCity = $("#cityName").val()
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        console.log(response)
        var temp = ((response.main.temp) - 273.15) * 1.8 + 32

        chosenCityTitle.text(response.name)
        chosenCityTemp.text("Temperature: " + temp.toFixed(2) + "℉")
        chosenCityHumid.text("Humidity: " + response.main.humidity + "%")
        chosenCityWind.text(response.name)
        chosenCityUV.text(response.name)
    });
}

//  search input
//  $("#cityName").val()  grabs the value inside the text area
$("#citySubmit").on("click", function (event) {
    event.preventDefault();
    // chosenCity = $("#cityName").val()
    // var APIkey = "93048a14e536394603a5f5173a41d761"
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    ajaxRetrieval();
    // $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
    //     console.log(response)
    //     var temp = ((response.main.temp) - 273.15) * 1.8 + 32

    //     chosenCityTitle.text(response.name)
    //     chosenCityTemp.text("Temperature: " + temp.toFixed(2) + "℉")
    //     chosenCityHumid.text("Humidity: " + response.main.humidity + "%")
    //     chosenCityWind.text(response.name)
    //     chosenCityUV.text(response.name)
    // });
})


//  Button saving

//  outputting to chosen city

//  List of cities on local storage

//  create the chosen city card when an input is put in

//  generate 5 cards for 5 day forecast

