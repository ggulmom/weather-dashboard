const api_key = "87d48032bafb781413b54cc13496bc3e"

$(function () {

    $("#search-button").on("click", function() {
        var location = $("#location-input").val();
        getWeather(location);
        

        // console.log (location);
    } );

});

async function getWeather(location) {
    const geocoding_url = "http://api.openweathermap.org/geo/1.0/direct?";
    const weather_url = "http://api.openweathermap.org/data/2.5/forecast?";

    let requestUrl = geocoding_url.concat(`q=${location}&limit=1&appid=${api_key}`);

    $.ajax({
        url: requestUrl,
        method:"GET",
    }).then(function(response){
        if(response.length === 0) return;
            
        let lat = response[0].lat;
        let lon = response[0].lon;
        // console.log(lat,lon);

        requestUrl = weather_url.concat(`lat=${lat}&lon=${lon}&appid=${api_key}`);
        return requestUrl;
    }).then(function(requestUrl) {
        if(requestUrl != undefined)
        {
            console.log('ok');
            $.ajax({
                url: requestUrl,
                method: "GET",
            }).then(function(response) {
                processWeatherData(response);
            });
        }
        // console.log(requestUrl);
    });

    // console.log(api_call);
}
// console.log ("JS loaded");

function processWeatherData(data) {
    console.log(data);
    console.log(data.list);
}