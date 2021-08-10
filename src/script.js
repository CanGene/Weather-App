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
  let hour = time.getHours();
  let hours = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  return hours[hour];
}
function changeBackground(icons) {
  let background = document.querySelector("#background");

  let backgroundSources = [
    {
      icon: "01d",
      description: "clear sky",
      bgSource: "media/clear sky/day.mp4",
    },
    {
      icon: "01n",
      description: "clear sky",
      bgSource: "media/clear sky/night.mp4",
    },
    {
      icon: "02d",
      description: "few clouds",
      bgSource: "media/few clouds/day.mp4",
    },
    {
      icon: "02n",
      description: "few clouds",
      bgSource: "media/few clouds/night.mp4",
    },
    {
      icon: "03d",
      description: "scattered clouds",
      bgSource: "media/scattered clouds/day.mp4",
    },
    {
      icon: "03n",
      description: "scattered clouds",
      bgSource: "media/scattered clouds.night.mp4",
    },
    {
      icon: "04d",
      description: "broken clouds",
      bgSource: "media/broken clouds/day.mp4",
    },
    {
      icon: "04n",
      description: "broken clouds",
      bgSource: "media/broken clouds/night.mp4",
    },
    {
      icon: "09d",
      description: "shower rain",
      bgSource: "media/shower rain/day.mp4",
    },
    {
      icon: "09n",
      description: "shower rain",
      bgSource: "media/shower rain/night.mp4",
    },
    { icon: "10d", description: "rain", bgSource: "media/rain/day.mp4" },
    { icon: "10n", description: "rain", bgSource: "media/rain/night.mp4" },
    {
      icon: "11d",
      description: "thunderstorm",
      bgSource: "media/thunderstorm/day.mp4",
    },
    {
      icon: "11n",
      description: "thunderstorm",
      bgSource: "media/thunderstorm/night.mp4",
    },
    { icon: "13d", description: "snow", bgSource: "media/snow/day.mp4" },
    { icon: "13n", description: "snow", bgSource: "media/snow/night.mp4" },
    { icon: "50d", description: "mist", bgSource: "media/mist/day.mp4" },
    { icon: "50n", description: "mist", bgSource: "media/mist/night.mp4" },
  ];
  let result = backgroundSources.find(({ icon }) => icon === `${icons}`);
  console.log(result);
  background.setAttribute("src", `${result.bgSource}`);
}

function getForecast(coordinates) {
  let apiKey = `4a9fc63d5c00d460d1556f4ff9c82bf2`;
  let apiUrlFuture = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=alerts,minutely&appid=${apiKey}&units=metric`;
  axios.get(apiUrlFuture).then(showHourlyForecast);
  axios.get(apiUrlFuture).then(showWeeklyForecast);
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
  if (precipitation === undefined) {
    precipitation.innerHTML = `${response.data.rain["1h"]}`;
  } else {
    precipitation.innerHTML = `--`;
  }

  getForecast(response.data.coord);
  changeBackground(response.data.weather[0].icon);
}

function showHourlyForecast(response) {
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
    <div class="temperature-daily-hourly">${Math.round(forecastHour.temp)}</div>
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
      <div >
      <img class="weather-icon-daily"
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="">
      </div>
      <div class="temperature-daily">
      <span class="high">${Math.round(forecastDay.temp.max)}</span>
        |
        <span class="low">${Math.round(forecastDay.temp.min)}</span>
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
  let hourlyTemp = document.querySelector(".temperature-daily-hourly");
  let highTemp = document.querySelector(".high");
  let lowTemp = document.querySelector(".low");
  let fahrenheit = Math.round(cityTemp * 1.8 + 32);
  let hourly = Math.round(forecastHour.temp * 1.8 + 32);
  let dailyHigh = Math.round(forecastDay.temp.max * 1.8 + 32);
  let dailyLow = Math.round(forecastDay.temp.min * 1.8 + 32);
  presentTemp.innerHTML = `${fahrenheit}`;
  hourlyTemp.innerHTML = `${hourly}`;
  highTemp.innerHTML = `${dailyHigh}`;
  lowTemp.innerHTML = `${dailyLow}`;
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

function search(city) {
  let apiKey = "4a9fc63d5c00d460d1556f4ff9c82bf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function clickHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
let hereButton = document.querySelector("#here");
hereButton.addEventListener("click", clickHere);

search("Burnaby");
