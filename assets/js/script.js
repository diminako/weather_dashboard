

var chosenCity = $("#chosenCity")
var chosenCityTitle = $("#chosenCityTitle")
var chosenCityTemp = $("#chosenCityTemp")
var chosenCityHumid = $("#chosenCityHumid")
var chosenCityWind = $("#chosenCityWind")
var chosenCityUV = $("span")
var UVindexPlaceHolder = $("#UVindexPlaceHolder")

// remove after logic formed
var chosenCity

var APIkey = "93048a14e536394603a5f5173a41d761"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

//  Current weather information
function ajaxRetrieval() {

    chosenCity = $("#cityName").val().split(' ').join('+')
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        var temp = ((response.main.temp) - 273.15) * 1.8 + 32
        var long = parseInt(response.coord.lon)
        var lat = parseInt(response.coord.lat)

        chosenCityTitle.text(response.name + "  -  " + moment().format("MMM Do YYYY"))
        chosenCityTemp.text("Temperature: " + temp.toFixed(2) + "℉")
        chosenCityHumid.text("Humidity: " + response.main.humidity + "%")
        chosenCityWind.text("Wind speed: " + response.wind.speed + " mph")
        UVindexPlaceHolder.html("UV Index: <span id='chosenCityUV'></span>")

        var UVIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIkey;

        $.ajax({ url: UVIndexURL, method: "GET" }).then(function (newResponse) {
            var chosenCityUV = $("#chosenCityUV")
            chosenCityUV.text(newResponse.value)
            if (parseInt(newResponse.value) < 3) {
                chosenCityUV.attr("style", "background-color: green")
            } else if (parseInt(newResponse.value) < 5) {
                chosenCityUV.attr("style", "background-color: yellow")
            } else if (parseInt(newResponse.value) < 8) {
                chosenCityUV.attr("style", "background-color: orange")
            } else if (parseInt(newResponse.value) < 10) {
                chosenCityUV.attr("style", "background-color: red")
            } else if (parseInt(newResponse.value) > 10) {
                chosenCityUV.attr("style", "background-color: maroon")
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
    fiveDayGen()
    fillInfiveDay()
})

$("#cityName").on("keypress", function (event) {
    if (event.which == 13 && !event.shiftKey) {
        event.preventDefault();
        ajaxRetrieval();
        fiveDayGen()
        fillInfiveDay()
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
        var fiveDayDiv = $("<div class='col-md-2' id='" + i + "' />")
        $("#fiveDay").append(fiveDayDiv)
        $("#" + i).append("<li id='li'" + i + "/>")
        $("#" + i).append("<li id='li'" + i + "/>")
        $("#" + i).append("<li id='li'" + i + "/>")
        $("#" + i).append("<li id='li'" + i + "/>")

        chosenCity = $("#cityName").val().split(' ').join('+')
        var APIkey = "93048a14e536394603a5f5173a41d761"
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&appid=" + APIkey

        $.ajax({ url: queryURL, method: "GET" }).then(function (forecastResponse) {


            $("#" + i).text(forecastResponse.list[i].dt_txt)
            $("#" + i).text(forecastResponse.list[i])
            $("#" + i).text(forecastResponse.list[i].main.temp)
            $("#" + i).text(forecastResponse.list[i])
        })
    }
}


function fillInfiveDay() {
    chosenCity = $("#cityName").val().split(' ').join('+')
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&appid=" + APIkey

    for (let i = 0; i < 5; i++) {
        $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {

            $("#" + i).text(forecast.list[i].dt_txt)
            $("#" + i).text(forecast.list[i])
            $("#" + i).text(forecast.list[i].main.temp)
            $("#" + i).text(forecast.list[i])


        })
    }
}
//  create 5 col-md-1 divs inside 5 day forecast

// fiveDayGen()