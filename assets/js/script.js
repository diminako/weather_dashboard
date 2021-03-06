
//  Set up variables
var chosenCity = $("#chosenCity")
var chosenCityTitle = $("#chosenCityTitle")
var chosenCityTemp = $("#chosenCityTemp")
var chosenCityHumid = $("#chosenCityHumid")
var chosenCityWind = $("#chosenCityWind")
var chosenCityUV = $("span")
var UVindexPlaceHolder = $("#UVindexPlaceHolder")
var hidden = $(".hidden")
var cityList = []
var APIkey = "93048a14e536394603a5f5173a41d761"

//  Current weather information
function ajaxRetrieval(chosenCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + chosenCity + "&appid=" + APIkey;

    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        var temp = ((response.main.temp) - 273.15) * 1.8 + 32
        var long = parseInt(response.coord.lon)
        var lat = parseInt(response.coord.lat)


        var imageURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
        var image = $("<img src='" + imageURL + "'>")
        // set the dashboard for the current city selected
        chosenCityTitle.html(response.name + "  -  " + moment().format("MMM Do YYYY") + "  -  ")
        chosenCityTitle.append(image)
        chosenCityTemp.text("Temperature: " + temp.toFixed(2) + "℉")
        chosenCityHumid.text("Humidity: " + response.main.humidity + "%")
        chosenCityWind.text("Wind speed: " + response.wind.speed + " mph")
        UVindexPlaceHolder.html("UV Index: <span id='chosenCityUV'></span>")

        var UVIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + APIkey;
        // if statement for the UV index color
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

// this section fill sin the forecast div
function fillInfiveDay(chosenCity) {
    var APIkey = "93048a14e536394603a5f5173a41d761"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + chosenCity + "&units=imperial&appid=" + APIkey

    $.ajax({ url: queryURL, method: "GET" }).then(function (forecast) {
        $("#fiveDay").empty()
        for (let i = 0; i < forecast.list.length; i++) {
            var thisWeather = forecast.list[i]
            if (thisWeather.dt_txt.split(" ")[1] === "15:00:00") {
                var col = $("<div class='col-md-2'>")
                col.addClass("bg-primary card mr-1")
                var date = $("<div>").text(thisWeather.dt_txt.substring(0, 10))

                var weather = $("<img>").attr("src", `https://openweathermap.org/img/wn/${thisWeather.weather[0].icon}.png`)
                weather.attr("width", "50")
                var temp = $("<div>").text("Temp: " + thisWeather.main.temp + "℉")
                var humid = $("<div>").text("Humidity: " + thisWeather.main.humidity)
                col.append(date, weather, temp, humid)

                $("#fiveDay").append(col)
            }
        }
    })
}

// controls the action from the submit button or enter button
$("#citySubmit").on("submit", function (event) {
    event.preventDefault();
    var chosenCity = $("#cityName").val().trim()
    hidden.removeClass("hidden")

    cityList.push(chosenCity)
    localStorage.setItem("City", chosenCity)

    renderList()
})

//  renders the past search results.
function renderList() {
    $(".citiesSaved").empty()
    for (let i = 0; i < cityList.length; i++) {
        var pastCity = $("<button>").text(cityList[i])
        pastCity.attr("data-city", cityList[i])

        pastCity.addClass("btn btn-dark cityName mb-2")
        $(".citiesSaved").prepend(pastCity)
    }
    ajaxRetrieval(encodeURIComponent(cityList[cityList.length - 1]))
}

//  Controls the click on the past cities selected buttons
$(document).on("click", ".cityName", function () {
    ajaxRetrieval(encodeURIComponent($(this).attr("data-city")))
    localStorage.setItem("City", $(this).attr("data-city"))
})

//  checks initial localstorage and populates if there is content to upload
function init() {
    if (!localStorage.getItem("City")) {
        return
    }
    hidden.removeClass("hidden")
    ajaxRetrieval(localStorage.getItem("City"))
}
init()
