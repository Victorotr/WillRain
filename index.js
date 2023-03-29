"use strict";

// Selectores

const formElement = document.forms.search;
const buttonGeolocation = document.querySelector("#geolocation-button");
const buttonSearch = document.querySelector("#search-button");
const rainElement = document.querySelector(".rain");
const cityElement = document.querySelector(".city");
const descriptionElement = document.querySelector(".description");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind-speed");
const forecastElement = document.querySelector(".forecast");
const locationPanel = document.querySelector(".location");
const mainPanel = document.querySelector(".main");
const errorPanel = document.querySelector(".error");
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".searchButton");
const cancelBtn = document.querySelector(".cancel-icon");
const searchInput = document.querySelector("input");

// ApiKey

const APIKey = "4d75b6ca92494c43935844f1cb91dc89";

// Esconder paneles

function hideAllPanels(panel) {
  panel.classList.add("hide");
}

// Mostrar panel expecificado

function showPanel(panel) {
  panel.classList.remove("hide");
}

// Moistrar panel inicial
showPanel(locationPanel);
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
  rainElement.innerHTML = "Will rain?";
  cityElement.innerHTML = "";
  descriptionElement.innerHTML = "";
  temperatureElement.innerHTML = "Temperature:";
  humidityElement.innerHTML = "Humidity:";
  windElement.innerHTML = "Wind Speed:";
  forecastElement.innerHTML = "Forecast 8 hours:";
};
//  Enter

formElement.addEventListener("submit", (event) => event.preventDefault());

// Button Geolocation

buttonGeolocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const urlGeolocation = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${latitude}&lon=${longitude}&key=${APIKey}&hours=48`;
    async function getWeather() {
      try {
        let response = await fetch(urlGeolocation);
        let data = await response.json();
        return data;
      } catch (error) {
        console.error("ERROR:", error);
      }
    }
    hideAllPanels(locationPanel);
    showPanel(mainPanel);

    async function weather() {
      const dataWeather = await getWeather();
      console.log(dataWeather);

      const forecastData = dataWeather.data.slice(0, 8);
      const willRain = forecastData.some(
        (hourRain) => hourRain.weather.precip > 0
      );
      if (willRain) {
        rainElement.textContent += " It will rain";
      } else {
        rainElement.textContent += " It won't not rain";
      }

      // for (const hourData of forecastData) {
      //   const hour = hourData.timestamp_local.substring(11, 16);
      //   const probRain = hourData.precip * 100;
      //   forecastElement.textContent += ` ${hour}. Prob: ${probRain} %`;
      // }

      const citySearch = dataWeather.city_name;
      const descrip = dataWeather.data[0].weather.description;
      const temp = dataWeather.data[0].temp;
      const humidity = dataWeather.data[0].rh;
      const wind = dataWeather.data[0].wind_spd;

      cityElement.textContent += citySearch;
      descriptionElement.textContent += descrip;
      temperatureElement.textContent += ` ${temp} ºC`;
      humidityElement.textContent += ` ${humidity} %`;
      windElement.textContent += ` ${wind} km/h`;
    }
    weather();

    rainElement.innerHTML = "";
    cityElement.innerHTML = "";
    descriptionElement.innerHTML = "";
    temperatureElement.innerHTML = "";
    humidityElement.innerHTML = "🌧️";
    windElement.innerHTML = "🌬️";
    forecastElement.innerHTML = "Forecast 8 hours:";
  });
});

// Button Search

buttonSearch.addEventListener("click", () => {
  const city = document.querySelector("#search-input").value;
  const urlCity = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${APIKey}&hours=48`;

  async function getWeather() {
    try {
      let response = await fetch(urlCity);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("ERROR:", error);
    }
  }

  async function weather() {
    const dataWeather = await getWeather();
    console.log(dataWeather);

    const forecastData = dataWeather.data.slice(0, 8);
    const willRain = forecastData.some(
      (hourRain) => hourRain.weather.precip > 0
    );
    if (willRain) {
      rainElement.textContent += " It will rain";
    } else {
      rainElement.textContent += " It won't not rain";
    }

    // for (const hourData of forecastData) {
    //   const hour = hourData.timestamp_local.substring(11, 16);
    //   const probRain = hourData.precip * 100;
    //   forecastElement.textContent += ` ${hour}. Prob: ${probRain} %`;
    // }

    const citySearch = dataWeather.city_name;
    const descrip = dataWeather.data[0].weather.description;
    const temp = dataWeather.data[0].temp;
    const humidity = dataWeather.data[0].rh;
    const wind = dataWeather.data[0].wind_spd;

    cityElement.textContent += citySearch;
    descriptionElement.textContent += descrip;
    temperatureElement.textContent += ` ${temp} ºC`;
    humidityElement.textContent += ` ${humidity} %`;
    windElement.textContent += ` ${wind} km/h`;
  }
  weather();

  rainElement.innerHTML = "";
  cityElement.innerHTML = "";
  descriptionElement.innerHTML = "";
  temperatureElement.innerHTML = "";
  humidityElement.innerHTML = "🌧️";
  windElement.innerHTML = "🌬️";
  forecastElement.innerHTML = "Forecast 8 hours:";
});
