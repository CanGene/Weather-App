let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let apiKey = `4a9fc63d5c00d460d1556f4ff9c82bf2`;
let presentTemp = document.querySelector("#temp-number");

function displayTime() {
  let presentHour = now.getHours();
  let presentMinutes = now.getMinutes();
  let presentTime = document.querySelector("#time");
  presentTime.innerHTML = `${presentHour}:${presentMinutes}`;
}
displayTime();

function displayDay() {
  let day = days[now.getDay()];
  let presentDay = document.querySelector("#date");
  presentDay.innerHTML = `${day}`;
}
displayDay();

function showCityTemperature(response) {
  console.log(response);
  let displayName = `${response.data.name}`;
  let city = document.querySelector("#city");
  cityTemp = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let nowIcon = document.querySelector("#weather-icon-now");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let precipitation = document.querySelector("#precipitation");
  city.innerHTML = `${displayName}`;
  presentTemp.innerHTML = `${cityTemp}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  nowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  nowIcon.setAttribute("alt", `${response.data.weather[0].description}`);
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${response.data.wind.speed}`;
  if (precipitation === undefined) {
    precipitation.innerHTML = `--`;
  } else {
    precipitation.innerHTML = `${response.data.rain["1h"]}`;
  }
}

function showHourlyForecast() {
  let hourlyTemp = document.querySelector("#hourly-weather");
  let hours = ["2:00", "5:00", "8:00", "11:00", "2:00"];
  let hourlyForecast = `<div class="row hourly">`;
  hours.forEach(function (hour) {
    hourlyForecast =
      hourlyForecast +
      `<div class="col">
    <h6>${hour}</h6>
    <div class="weather-icon-hourly">
    <i class="fas fa-cloud-sun-rain"></i>
    </div>
    <div class="temperature-daily-hourly">27°</div>
    </div>`;
  });

  hourlyForecast = hourlyForecast + `</div>`;
  hourlyTemp.innerHTML = hourlyForecast;
}
showHourlyForecast();

function toFahrenheit(event) {
  event.preventDefault();
  celLink.classList.remove("active");
  fahLink.classList.add("active");
  let fahrenheit = Math.round(cityTemp * 1.8 + 32);
  presentTemp.innerHTML = `${fahrenheit}`;
}
let fahLink = document.querySelector("#fahrenheit");
fahLink.addEventListener("click", toFahrenheit);

function toCelsius(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahLink.classList.remove("active");
  presentTemp.innerHTML = cityTemp;
}
let celLink = document.querySelector("#celsius");
celLink.addEventListener("click", toCelsius);

let cityTemp = null;

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city");
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlSearch).then(showCityTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `4a9fc63d5c00d460d1556f4ff9c82bf2`;
  let apiUrlHere = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlHere).then(showCityTemperature);
}
function clickHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let hereButton = document.querySelector("#here");
hereButton.addEventListener("click", clickHere);
