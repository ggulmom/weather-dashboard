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
    var requestUrl = geocoding_url.concat(`q=${location}&limit=1&appid=${api_key}`);

    // fetch(requestUrl)
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {
    //     if(data.lenght===0) return;
    //     var lat = data[0].lat;
    //     var lon = data[0].lon;
    // });

    $.ajax({
        url: requestUrl,
        method:"GET",
    }).then(function(response){
        console.log(response);
    });

    // console.log(api_call);
}
// console.log ("JS loaded");
