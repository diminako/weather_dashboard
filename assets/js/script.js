

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

function localStorageCities() {

}

function fiveDayGen() {
    for (let i = 0; i < 5; i++) {
        var fiveDayDiv = $("<div class='col-md-2' id='" + i + "' />")
        $("#fiveDay").append(fiveDayDiv)
        $("#" + i).append("<li id='liDate" + i + "' />")
        $("#" + i).append("<li id='liImg" + i + "' />")
        $("#" + i).append("<li id='liTemp" + i + "' />")
        $("#" + i).append("<li id='liHumid" + i + "' />")
    }
}

function fillInfiveDay() {
    chosenCity = $("#cityName").val().split(' ').join('+')
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&appid=" + APIkey

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        $("#liDate0").text(forecast.list[0].dt_txt.substring(0, 10))

        $("#liImg0").text(forecast.list[0])

        $("#liTemp0").text(forecast.list[0].main.temp)
        $("#liHumid0").text(forecast.list[0].main.humidity)

        console.log(forecast)
    })

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        $("#liDate1").text(forecast.list[7].dt_txt.substring(0, 10))

        $("#liImg1").text(forecast.list[7])

        $("#liTemp1").text(forecast.list[7].main.temp)
        $("#liHumid1").text(forecast.list[7].main.humidity)
    })

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        $("#liDate2").text(forecast.list[15].dt_txt.substring(0, 10))

        $("#liImg2").text(forecast.list[15])

        $("#liTemp2").text(forecast.list[15].main.temp)
        $("#liHumid2").text(forecast.list[15].main.humidity)
    })

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        $("#liDate3").text(forecast.list[23].dt_txt.substring(0, 10))

        $("#liImg3").text(forecast.list[23])

        $("#liTemp3").text(forecast.list[23].main.temp)
        $("#liHumid3").text(forecast.list[23].main.humidity)
    })

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        $("#liDate4").text(forecast.list[31].dt_txt.substring(0, 10))

        $("#liImg4").text(forecast.list[31])

        $("#liTemp4").text(forecast.list[31].main.temp)
        $("#liHumid4").text(forecast.list[31].main.humidity)
    })
}


//  create 5 col-md-1 divs inside 5 day forecast

//  Button saving

//  outputting to chosen city

//  List of cities on local storage

//  create the chosen city card when an input is put in
// fiveDayGen()