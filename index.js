"use strict";

// Selectores

// Para funciones

const formElement = document.forms.search;
const buttonGeolocation = document.querySelector("#geolocation-button");
const buttonSearch = document.querySelector("#search-button");
const rainElement = document.querySelector(".rain");
const cityElement = document.querySelector(".city");
const descriptionElement = document.querySelector(".description");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind-speed");
const forecastElement = document.querySelector(".weather-forecast");
const locationPanel = document.querySelector(".location");

// Para CSS

const mainPanel = document.querySelector(".main");
const errorPanel = document.querySelector(".error");
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".searchButton");
const cancelBtn = document.querySelector(".cancel-icon");
const searchInput = document.querySelector("input");
const borderElement = document.querySelector(".hidden");

// Paneles

// Esconder paneles

function hideAllPanels(panel) {
  panel.classList.add("hide");
}

// Mostrar panel especificado

function showPanel(panel) {
  panel.classList.remove("hide");
}

// Mostrar panel inicial

showPanel(locationPanel);

//Esconder cuadrícula
// hiddenBorder () {
//   borderElement.classList.add("hidden")
// }

// Animaciones

// Animación del buscador

searchBtn.onclick = () => {
  searchBox.classList.add("active");
  searchBtn.classList.add("active");
  searchInput.classList.add("active");
  cancelBtn.classList.add("active");
  searchInput.focus();
};
cancelBtn.onclick = () => {
  searchBox.classList.remove("active");
  searchBtn.classList.remove("active");
  searchInput.classList.remove("active");
  cancelBtn.classList.remove("active");
  searchInput.value = "";
  rainElement.innerHTML = "";
  cityElement.innerHTML = "";
  descriptionElement.innerHTML = "";
  temperatureElement.innerHTML = "";
  humidityElement.innerHTML = "";
  windElement.innerHTML = "";
  forecastElement.innerHTML = "";
};

// ApiKey

const APIKey = "4d75b6ca92494c43935844f1cb91dc89";

// Función manejadora

const handleDataWeather = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const urlGeolocation = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${latitude}&lon=${longitude}&key=${APIKey}&hours=48`;
    const city = document.querySelector("#search-input").value;
    const urlCity = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${APIKey}&hours=48`;
    async function getWeather() {
      try {
        if (city !== "") {
          let response = await fetch(urlCity);
          let data = await response.json();
          return data;
        } else {
          let response = await fetch(urlGeolocation);
          let data = await response.json();
          return data;
        }
      } catch (error) {
        console.error("ERROR:", error);
      }
    }
    hideAllPanels(locationPanel);
    showPanel(mainPanel);

    async function weather() {
      const dataWeather = await getWeather();
      console.log(dataWeather); // Acordarse de borrarlo

      const forecastData = dataWeather.data.slice(0, 8);
      const willRain = forecastData.some((hourRain) => hourRain.pop > 0);
      if (willRain) {
        rainElement.textContent += " It will rain";
      } else {
        rainElement.textContent += " It won't rain";
      }

      let newLiForecast;
      for (const hourData of forecastData) {
        const hour = hourData.timestamp_local.substring(11, 16);
        const probRain = Number.parseFloat(hourData.pop);
        newLiForecast = document.createElement("li");
        newLiForecast.textContent += ` ${hour}. Prob. Rain: ${probRain} %`;
        forecastElement.append(newLiForecast);
      }

      const citySearch = dataWeather.city_name;
      const descrip = dataWeather.data[0].weather.description;
      const temp = dataWeather.data[0].temp;
      const humidity = dataWeather.data[0].rh;
      const wind = dataWeather.data[0].wind_spd;

      cityElement.textContent += citySearch;
      descriptionElement.textContent += descrip;
      temperatureElement.textContent += ` ${temp} ºC`;
      humidityElement.textContent += `Hum. 💧 ${humidity} %`;
      windElement.textContent += `Wind 💨 ${wind} m/s`;
    }
    weather();

    rainElement.innerHTML = "";
    cityElement.innerHTML = "";
    descriptionElement.innerHTML = "";
    temperatureElement.innerHTML = "";
    humidityElement.innerHTML = "";
    windElement.innerHTML = "";
    forecastElement.innerHTML = "";
  });
};

//  Enter

formElement.addEventListener("submit", (event) => event.preventDefault());

// Button Geolocation

buttonGeolocation.addEventListener("click", () => {
  handleDataWeather();
});

// Button Search

buttonSearch.addEventListener("click", () => {
  handleDataWeather();
});

// Error Browser Consola ((Provisional))

if (typeof browser === "undefined") {
  var browser = chrome;
}
