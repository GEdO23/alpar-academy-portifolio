// @ts-nocheck
const OPENWEATHER_API_KEY = 'dae954f3b3091126a69bc997beae1f8e';
const lang = 'pt_br';
const units = 'metric';
const app = angular.module('weatherApp', []);

app.controller('WeatherController', function ($scope, $http) {
    $scope.isCardActive = false;

    $scope.city = '';
    $scope.cityName = '';
    $scope.temperature = '';
    $scope.feelsLike = '';
    $scope.minTemperature = '';
    $scope.maxTemperature = '';
    $scope.humidity = '';
    $scope.windVelocity = '';
    $scope.windOrientation = '';
    $scope.iconUrl = '';
    $scope.iconAlt = '';

    $scope.callApy = async () => {
        const city = $scope.city || localStorage.getItem('city');

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appId=${OPENWEATHER_API_KEY}&units=${units}&lang=${lang}`;
            const response = await $http.get(url);
            const data = response.data;
            const icon = data.weather[0];

            $scope.iconUrl = `https://openweathermap.org/img/wn/${icon.icon}@4x.png`;
            $scope.iconAlt = icon.description;
            $scope.temperature = Math.round(data.main.temp).toString();
            $scope.feelsLike = Math.round(data.main.feels_like).toString();
            $scope.minTemperature = Math.round(data.main.temp_min).toString();
            $scope.maxTemperature = Math.round(data.main.temp_max).toString();
            $scope.humidity = data.main.humidity.toLocaleString();
            $scope.windVelocity = data.wind.speed.toLocaleString();
            $scope.windOrientation = data.wind.deg;
            $scope.cityName = data.name;
            localStorage.setItem('city', data.name);
            $scope.isCardActive = true;
        } catch (error) {
            console.error(error);
            alert('Ocorreu algum erro.');
        } finally {
            $scope.$apply();
        }
    }

    $scope.callApy();
})