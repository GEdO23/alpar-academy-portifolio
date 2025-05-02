/**
 * @typedef {{
    * coord: {lon: number, lat: number}, 
    * weather: {id: number, main: string, description: string, icon: string}[], 
    * base: string, 
    * main: {temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number, sea_level: number, grnd_level: number}, 
    * visibility: number, 
    * wind: {speed: number, deg: number, gust: number}, 
    * clouds: {all: number}, 
    * dt: number, 
    * sys: {type: number, id: number, country: string, sunrise: number, sunset: number}, 
    * timezone: number, 
    * id: number, 
    * name: string, 
    * cod: number
 * }} WeatherAPIJson
 */

const cardEl = document.querySelector('.card');
/** @type {HTMLImageElement?} */
const weatherIconEl = document.querySelector('.card img#weather-icon');
const temperatureEl = document.querySelector('.card .temperature>span');
const feelsLikeEl = document.querySelector('.card .feels-like>span');
const minTemperatureEl = document.querySelector('.card span.min');
const maxTemperatureEl = document.querySelector('.card span.max');
const humidityEl = document.querySelector('.card .humidity>span');
/** @type {HTMLImageElement?} */
const windIconEl = document.querySelector('.card .wind-icon');
const windSpeedEl = document.querySelector('.card .wind-speed>span');
/** @type {HTMLInputElement?} */
const cityInputEl = document.querySelector('input#city-input');
const btnSearchCityEl = document.querySelector('button#btn-search-city');

/**
 * 
 * @param {string} city 
 * @param {string} apiKey 
 * @param {string} units 
 * @param {string} lang 
 */
async function callApi(city, apiKey, units = 'metric', lang = 'pt_br') {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appId=${apiKey}&units=${units}&lang=${lang}`;
        const response = await fetch(apiUrl);
        /** @type {WeatherAPIJson} */
        const data = await response.json();

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        if (weatherIconEl) {
            weatherIconEl.src = iconUrl;
            weatherIconEl.alt = data.weather[0].description;
        }
        if (temperatureEl) temperatureEl.innerHTML = Math.round(data.main.temp).toString();
        if (feelsLikeEl) feelsLikeEl.innerHTML = Math.round(data.main.feels_like).toString();
        if (minTemperatureEl) minTemperatureEl.innerHTML = Math.round(data.main.temp_min).toString();
        if (maxTemperatureEl) maxTemperatureEl.innerHTML = Math.round(data.main.temp_max).toString();
        if (humidityEl) humidityEl.innerHTML = data.main.humidity.toLocaleString();
        if (windSpeedEl) windSpeedEl.innerHTML = data.wind.speed.toLocaleString();
        if (windIconEl) windIconEl.style.transform = `rotate(${data.wind.deg}deg)`;
        if (cardEl) cardEl.classList.add('active');
    } catch (error) {
        console.error(error);
        alert('Ocorreu algum erro.');
        if (cardEl) cardEl.classList.remove('active');
    }
}

if (btnSearchCityEl) btnSearchCityEl.addEventListener('click', () => {
    const city = cityInputEl ? cityInputEl.value : '';
    const OPENWEATHER_API_KEY = 'dae954f3b3091126a69bc997beae1f8e';
    callApi(city, OPENWEATHER_API_KEY);
})