// const { data } = require("autoprefixer");

let latitde = localStorage.getItem("latitde");
let longitde = localStorage.getItem("longitde");
// console.log(latitde, longitde)



// https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=41b50650ae1052e1e72337f8750ad5b6&units=metric"


///////
///adding the functionality  for setting the coords in the map when the user open the website
///////
if (latitde && longitde) {
    document.getElementById("gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${latitde},${longitde}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
} else {
    document.getElementById("gmap_canvas").setAttribute("src", `https:/maps.google.com/maps?q=London&t=&z=13&ie=UTF8&iwloc=&output=embed`)
}



/////
////adding functionality  for manual searching for the weather report
/////

document.getElementById("search").addEventListener('click', function() {
    var value = document.getElementById("city").value;

    if (typeof(value) == Number) {
        url = `api.openweathermap.org/data/2.5/weather?q=${value}&appid=41b50650ae1052e1e72337f8750ad5b6&units=metric`
    } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=41b50650ae1052e1e72337f8750ad5b6&units=metric`
    }

    weatherData();


    ////settting google map data
    document.getElementById("gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${value}&t=&z=13&ie=UTF8&iwloc=&output=embed`)


})



//////showing the weather information in the main div of the screen
if (latitde && longitde) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitde}&lon=${longitde}&appid=41b50650ae1052e1e72337f8750ad5b6&units=metric`;

} else {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=London&APPID=41b50650ae1052e1e72337f8750ad5b6&units=metric`;
}

async function weatherData() {

    try {


        let res = await fetch(url);
        let response = await res.json();

        let data = response.main;
        // console.log(response);
        // console.log(data);

        /////
        displayWeather(data, response);


    } catch {
        alert("Error Occured")

    }

}

weatherData();




///////////////
/////making function to display the wather data
//////////////

function displayWeather(data, response) {
    document.getElementById("Cnter").textContent = `Weather Info,${response.name}`;
    console.log(response);


    document.getElementById("temperature").textContent = `Temperature : ${data.temp}°C`;

    ///////
    document.getElementById("humidity").textContent = `Humidity : ${data.humidity}%`;

    document.getElementById("air-speed").textContent = `Wind-speed : ${response.wind.speed} m/s`;

    /////
    document.getElementById("pressure").textContent = `Pressure: ${data.pressure /1000} atm`;

    //
    document.getElementById("temp--maxmin").textContent = `Temp.(max/min): ${data.temp_max}°C ,${data.temp_min}°C`;

    ///

    let Sunrise = String(new Date(response.sys.sunrise));
    Sunrise = Sunrise.split(' ');

    // console.log(Sunrise[4]);

    document.getElementById("sunrise").textContent = `🌅Sunrise : ${Sunrise[4]} am`;
    ////

    let Sunset = String(new Date(response.sys.sunset));
    Sunset = Sunset.split(' ');
    document.getElementById("sunset").textContent = `🌇Sunset : ${Sunset[4]} pm`

}



document.getElementById('getWeek').addEventListener('click', function() {
    alert("Scroll Down!!")
    sevenDayData();

})

//////
/////function to display seven day data
//////
function displaySevenDayData(sdata) {

    sdata.map(function(ele, index) {



        document.getElementById("sevenDay").style.display = "grid";

        document.querySelector(`#t${index+1}`).textContent = `Temp(min/max)🌤️: ${Math.floor(ele.temp.min -273)}°C ,${Math.floor(ele.temp.max -273)}°C `;
        document.querySelector(`#h${index+1}`).textContent = `Humidity🌨️: ${ele.humidity}%`;
        document.querySelector(`#temp${index+1}--maxmin${index+1}`).textContent = `Wind-Speed🌩️: ${ele.wind_speed} m/s`;
    })

}



///////////////
//////////////
//////Setting latitude and longitude in local storage and accessing for getting current location
///////////////////
let anotherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitde}&lon=${longitde}&exclude=minutely&appid=41b50650ae1052e1e72337f8750ad5b6`;

async function sevenDayData() {


    try {

        let other = await fetch(anotherURL);

        let otherResponse = await other.json();

        var sdata = otherResponse.daily;
        // console.log(sdata);
        displaySevenDayData(sdata);


    } catch {

        // console.log("Error!!!!!!!!!!!!🤞❌");

    }
}



/////////////
///////////
/////getting users current location by the help of JavaScript and saving the coords in the localStorage
navigator.geolocation.getCurrentPosition(function(position) {

    let latitde = position.coords.latitude;
    let longitde = position.coords.longitude;

    localStorage.setItem("latitde", latitde);
    localStorage.setItem("longitde", longitde)

}, function() {
    console.log("Error!");
})