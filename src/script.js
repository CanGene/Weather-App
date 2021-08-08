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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
function formatHour(timestamp) {
  let time = new Date(timestamp * 1000);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return time[hours];
}

function getForecast(coordinates) {
  let apiKey = `4a9fc63d5c00d460d1556f4ff9c82bf2`;
  let apiUrlHourly = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=alerts,minutely&appid=${apiKey}&units=metric`;
  axios.get(apiUrlHourly).then(showHourlyForecast);
  axios.get(apiUrlHourly).then(showWeeklyForecast);
}
function showCityTemperature(response) {
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

  getForecast(response.data.coord);
}

function showHourlyForecast(response) {
  console.log(response);
  let hourly = response.data.hourly;
  let hourlyTemp = document.querySelector("#hourly-weather");
  let hourlyForecast = `<div class="row hourly">`;
  hourly.forEach(function (forecastHour, index) {
    if (index < 5) {
      hourlyForecast =
        hourlyForecast +
        `<div class="col">
    <h6>${formatHour(forecastHour.dt)}</h6>
    <div >
    <img class="weather-icon-hourly"
    src="http://openweathermap.org/img/wn/${
      forecastHour.weather[0].icon
    }@2x.png" alt="">
    </div>
    <div class="temperature-daily-hourly">${forecastHour.temp}</div>
    </div>`;
    }
  });

  hourlyForecast = hourlyForecast + `</div>`;
  hourlyTemp.innerHTML = hourlyForecast;
}

function showWeeklyForecast(response) {
  let daily = response.data.daily;
  let weeklyTemp = document.querySelector("#weekly");
  let weeklyForecast = `<div class="row">`;
  daily.forEach(function (forecastDay, index) {
    if (index < 6) {
      weeklyForecast =
        weeklyForecast +
        `<div class="col-md-4 day">
                      <h4>${formatDay(forecastDay.dt)}</h4>
                      <div class="weather-icon">
                        <img src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png" alt="">
                      </div>
                      <div class="temperature-daily">
                      <span id="high">${Math.round(forecastDay.temp.max)}</span>
                      |
                      <span id="low">${Math.round(forecastDay.temp.min)}</span>
                      </div>
                    </div>`;
    }
  });

  weeklyForecast = weeklyForecast + `</div>`;
  weeklyTemp.innerHTML = weeklyForecast;
}

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
