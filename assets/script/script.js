const api_key = "87d48032bafb781413b54cc13496bc3e"

$(function () {

    $("#search-button").on("click", function() {
        var location = $("#location-input").val();
        // getWeather(location);
        getWeather("San Diego");
        
    } );

});

async function getWeather(location) {
    const geocoding_url = "https://api.openweathermap.org/geo/1.0/direct?";
    const forecast_url = "https://api.openweathermap.org/data/2.5/forecast?";
    const weather_url = "https://api.openweathermap.org/data/2.5/weather?";

    let requestUrl = geocoding_url.concat(`q=${location}&limit=1&appid=${api_key}`);

    $.ajax({
        url: requestUrl,
        method:"GET",
    }).then(function(response){
        if(response.length === 0) return;
            
        let lat = response[0].lat;
        let lon = response[0].lon;

        let weather_fetch_url = weather_url.concat(`lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`);
        let forecast_fetch_url = forecast_url.concat(`lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`);

        weatherFetch(weather_fetch_url);
        // forecastFetch(forecast_fetch_url);

    });
}


function weatherFetch(url) {
    $.ajax({
        url: url,
        method: "GET",
    }).then(function(response) {
        updateWeather(response);
    });
};

function updateWeather(item) {
    console.log(item);

    let dt = new Date(item.dt * 1000);
    let yyyy = dt.getFullYear();
    let mm = dt.getMonth() + 1;
    let dd = dt.getDate();
    let hh = dt.getHours();
    let icon = item.weather[0].icon;
    let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    let temperature = item.main.temp;
    let humidity = item.main.humidity;
    let wind = item.wind.speed;

    let dateStr = `${mm}/${dd}/${yyyy}`;
    let city = item.name;

    $("#weather-container div #city").text(`${city} (${dateStr})`);
    $("#weather-container #icon").html(`<img src="${icon_url}"></img`);
    $("#weather-container div #temperature").text(`Temp: ${temperature} °F`);
    $("#weather-container div #wind").text(`Wind: ${wind} MPH`);
    $("#weather-container div #humidity").text(`Humidity: ${humidity} %`);


    console.log(dateStr, temperature, humidity, wind);
    
}
    // let dt = new Date(data.list[0].dt);
    // // let date_str = $.datepicker.formatDate('yymmdd', test);
    // console.log(test);