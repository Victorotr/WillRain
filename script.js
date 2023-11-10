"use strict";

// Selectores

// Para funciones

const formElement = document.forms.search;
const buttonGeolocation = document.querySelector(".geolocation-button");
const buttonSearch = document.querySelector(".search-button");
const buttonError = document.querySelector(".button-error");
const descriptionElement = document.querySelector(".description");
const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind-speed");
const rainElement = document.querySelector(".rain");
const forecastElement = document.querySelector(".weather-forecast");
const locationPanel = document.querySelector(".location");

// Para CSS

const mainPanel = document.querySelector(".main");
const errorPanel = document.querySelector(".error");
const searchBox = document.querySelector(".search-box");
const cancelBtn = document.querySelector(".cancel-icon");
const searchInput = document.querySelector("input");
const borderElement = document.querySelector(".hidden");
const tittleMain = document.querySelector(".title-main");

// Paneles

// Esconder paneles

function hidePanels(panel) {
  panel.classList.add("hide");
}

// Mostrar panel especificado

function showPanel(panel) {
  panel.classList.remove("hide");
}

// Mostrar panel inicial

showPanel(locationPanel);

// Animaciones

buttonSearch.onclick = () => {
  searchBox.classList.add("active");
  searchInput.classList.add("active");
  cancelBtn.classList.add("active");
  searchInput.focus();
};

cancelBtn.onclick = () => {
  searchBox.classList.remove("active");
  buttonSearch.classList.remove("active");
  searchInput.classList.remove("active");
  cancelBtn.classList.remove("active");
  searchInput.value = "";
};

buttonError.onclick = () => {
  hidePanels(errorPanel);
  showPanel(locationPanel);
};

// ApiKey

const APIKey = "4f302c25141b40e0a7601cabeabf4444";


// Función manejadora

const handleDataWeather = () => {
  function success(position) {
    const { latitude, longitude } = position.coords;
    const urlGeolocation = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${latitude}&lon=${longitude}&key=${APIKey}&hours=48`;
    const city = document.querySelector("#search-input").value;
    const urlCity = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${APIKey}&hours=48`;
    async function getWeather() {
      try {
        let data;
        let response;
        if (buttonSearch.classList.contains("active") === false) {
          response = await fetch(urlGeolocation);
          data = await response.json();
          return data;
        } else {
          if (city !== "") {
            response = await fetch(urlCity);
            data = await response.json();
            return data;
          }
        }
      } catch (error) {
        hidePanels(locationPanel);
        hidePanels(mainPanel);
        showPanel(errorPanel);
        console.error("Error:", error.message);
      }
    }
    async function weather() {
      try {
        const dataWeather = await getWeather();
        if (dataWeather !== undefined) {
          hidePanels(locationPanel);
          showPanel(mainPanel);
        }

        const descriptionData = dataWeather.data[0].weather.description;
        const dataMainRain = descriptionData.toLowerCase().indexOf("rain");
        const dataMainClearly = descriptionData.toLowerCase().indexOf("clear");
        if (dataMainRain !== -1) {
          mainPanel.classList.remove("clearly");
          mainPanel.classList.remove("clouds");
          mainPanel.classList.add("rainy");
        } else if (dataMainClearly !== -1) {
          mainPanel.classList.remove("rainy");
          mainPanel.classList.remove("clouds");
          mainPanel.classList.add("clearly");
        } else {
          mainPanel.classList.remove("rainy");
          mainPanel.classList.remove("clearly");
          mainPanel.classList.add("clouds");
        }

        const descrip = dataWeather.data[0].weather.description;
        const cities = dataWeather.city_name;
        const temp = dataWeather.data[0].temp;
        const humidity = dataWeather.data[0].rh;
        const wind = dataWeather.data[0].wind_spd;

        descriptionElement.textContent += descrip;
        cityElement.textContent += cities;
        temperatureElement.textContent += ` ${temp} ºC`;
        humidityElement.textContent += `Hum. 💧 ${humidity} %`;
        windElement.textContent += `Wind 💨 ${wind} m/s`;

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
      } catch (error) {
        console.log("Se inicia la animación del buscador");
      }
    }
    weather();

    buttonSearch.classList.remove("active");
    descriptionElement.innerHTML = "";
    cityElement.innerHTML = "";
    temperatureElement.innerHTML = "";
    humidityElement.innerHTML = "";
    windElement.innerHTML = "";
    rainElement.innerHTML = "";
    forecastElement.innerHTML = "";
  }

  function error() {
    hidePanels(locationPanel);
    hidePanels(mainPanel);
    showPanel(errorPanel);
  }

  navigator.geolocation.getCurrentPosition(success, error);
};

//  Enter

formElement.addEventListener("submit", (event) => event.preventDefault());

// Button Geolocation

buttonGeolocation.addEventListener("click", () => {
  tittleMain.innerHTML = "";
  handleDataWeather();
});

// Button Search

buttonSearch.addEventListener("click", () => {
  handleDataWeather();
  hidePanels(errorPanel);
  buttonSearch.classList.add("active");
  tittleMain.innerHTML = "";
});

// Accesibilidad

const skipGeolocation = document.querySelector(".skip");
const returnGeolocation = document.querySelector(".return");
const geolocationAgain = document.querySelector(".geolocation-again");

skipGeolocation.addEventListener("click", () => {
  mainPanel.classList.remove("rainy");
  mainPanel.classList.remove("clearly");
  mainPanel.classList.remove("clouds");
  mainPanel.classList.add("default");
  descriptionElement.innerHTML = "";
  cityElement.innerHTML = "";
  temperatureElement.innerHTML = "";
  humidityElement.innerHTML = "";
  windElement.innerHTML = "";
  rainElement.innerHTML = "";
  forecastElement.innerHTML = "";
  hidePanels(locationPanel);
  showPanel(mainPanel);
});

returnGeolocation.addEventListener("click", () => {
  hidePanels(mainPanel);
  showPanel(locationPanel);
});

geolocationAgain.addEventListener("click", () => {
  handleDataWeather();
});
