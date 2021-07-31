//common variables
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

//time

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

//display searched city and temperature

function showCityTemperature(response) {
  console.log(response);
  let displayName = `${response.data.name}`;
  let city = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  let nowIcon = document.querySelector("#weather-icon-now");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let precipitation = document.querySelector("#precipitation");
  city.innerHTML = `${displayName}`;
  presentTemp.innerHTML = `${temperature}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  nowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  nowIcon.setAttribute("alt", `${response.data.weather[0].description}`);
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${response.data.wind.speed}`;
  if (precipitation !== undefined) {
    precipitation.innerHTML = `${response.data.rain["1h"]}`;
  } else {
    precipitation.innerHTML = `--`;
  }

  function toCelsius(event) {
    event.preventDefault();
    presentTemp.innerHTML = `${temperature}`;
  }
  let celLink = document.querySelector("#celsius");
  celLink.addEventListener("click", toCelsius);

  function toFahrenheit(event) {
    event.preventDefault();
    let fahrenheit = Math.round(temperature * 1.8 + 32);
    presentTemp.innerHTML = `${fahrenheit}`;
  }
  let fahLink = document.querySelector("#fahrenheit");
  fahLink.addEventListener("click", toFahrenheit);
}

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city");
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlSearch).then(showCityTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

//display current location and temperature

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
