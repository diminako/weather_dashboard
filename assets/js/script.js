

var chosenCity = $("#chosenCity")
var chosenCityTitle = $("#chosenCityTitle")
var chosenCityTemp = $("#chosenCityTemp")
var chosenCityHumid = $("#chosenCityHumid")
var chosenCityWind = $("#chosenCityWind")
var chosenCityUV = $("span")
var UVindexPlaceHolder = $("#UVindexPlaceHolder")
var cityList = []
var APIkey = "93048a14e536394603a5f5173a41d761"

//  Current weather information
function ajaxRetrieval(chosenCity) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        var temp = ((response.main.temp) - 273.15) * 1.8 + 32
        var long = parseInt(response.coord.lon)
        var lat = parseInt(response.coord.lat)

        console.log(response.weather[0].icon)

        var imageURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        var image = $("<img src='" + imageURL + "'>")

        chosenCityTitle.html(response.name + "  -  " + moment().format("MMM Do YYYY") + "  -  ")
        chosenCityTitle.append(image)
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
    fillInfiveDay(chosenCity)
}


function fillInfiveDay(chosenCity) {
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&units=imperial&appid=" + APIkey

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        console.log(forecast)
        $("#fiveDay").empty()
        for (let i = 0; i < forecast.list.length; i++) {
            var thisWeather = forecast.list[i]
            if (thisWeather.dt_txt.split(" ")[1] === "15:00:00") {
                console.log(thisWeather)
                var col = $("<div class='col-md-2'>")
                col.addClass("bg-primary card mr-1")
                var date = $("<div>").text(thisWeather.dt_txt.substring(0, 10))

                var weather = $("<img>").attr("src", `http://openweathermap.org/img/wn/${thisWeather.weather[0].icon}.png`)
                weather.attr("width", "50")
                var temp = $("<div>").text("Temp: " + thisWeather.main.temp + "℉")
                var humid = $("<div>").text("Humidity: " + thisWeather.main.humidity)
                col.append(date, weather, temp, humid)

                $("#fiveDay").append(col)
            }
        }
    })
}

$("#citySubmit").on("submit", function (event) {
    event.preventDefault();
    var chosenCity = $("#cityName").val().trim()




    cityList.push(chosenCity)
    localStorage.setItem("City", chosenCity)


    renderList()
})



function renderList() {
    $(".citiesSaved").empty()
    for (let i = 0; i < cityList.length; i++) {
        console.log("render")
        var pastCity = $("<button>").text(cityList[i])
        pastCity.attr("data-city", cityList[i])

        pastCity.addClass("btn btn-dark cityName mb-2")
        $(".citiesSaved").prepend(pastCity)

    }
    ajaxRetrieval(encodeURIComponent(cityList[cityList.length - 1]))
}



$(document).on("click", ".cityName", function () {
    ajaxRetrieval(encodeURIComponent($(this).attr("data-city")))

    cityList.push(chosenCity)
    localStorage.setItem("City", $(this).attr("data-city"))

})

function init() {
    if (localStorage) {
        localStorage.getItem("City")
        ajaxRetrieval(localStorage.getItem("City"))
    }
}

init()
