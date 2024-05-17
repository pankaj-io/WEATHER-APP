const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_Img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationContainer = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    /*
    const url = 'https://open-weather13.p.rapidapi.com/city/landon';
    const options = {    
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'db8f157b67msh7ffa6252fb2f4aep189ef6jsnf6643f277f66',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
     */

    const api_key = "d523f1dcf38bf7696b5f9db2827003c0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === '404') {
        locationContainer.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    console.log("run");
    locationContainer.style.display = "none";
    weather_body.style.display = "flex";
    console.log(weather_data);

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}ºC`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;


    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_Img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_Img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_Img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_Img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_Img.src = "/assets/snow.png";
            break;
    }
    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});