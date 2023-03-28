"use strict";

// Selectores

const buttonGeolocation = document.querySelector("#geolocation-button");
const buttonSearch = document.querySelector("#search-button");
const descriptionElement = document.querySelector(".description");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind-speed");
const rainElement = document.querySelector(".rain");

// ApiKey

const APIKey = "ff1890d6b5c6ab10a7a079f29d86c7eb";

// Button Geolocation

buttonGeolocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const urlGeolocation = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
    async function getWeather() {
      try {
        let response = await fetch(urlGeolocation);
        let data = await response.json();
        return data;
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    async function weather() {
      const dataWeather = await getWeather();
      console.log(dataWeather);

      const forecast = dataWeather.list.slice(0, 8);
      const willRain = forecast.some(
        (hour) => hour.weather[0].main.toLowerCase() === "rain"
      );

      if (willRain) {
        rainElement.textContent += " Si";
      } else {
        rainElement.textContent += " No";
      }

      const descrip = dataWeather.list[0].weather[0].description;
      const temp = dataWeather.list[0].main.temp;
      const conversionKelvin = 273.15;
      const humidity = dataWeather.list[0].main.humidity;
      const wind = dataWeather.list[0].wind.speed;

      descriptionElement.textContent += descrip;
      temperatureElement.textContent += ` ${parseInt(
        temp - conversionKelvin
      )} ºC`;
      humidityElement.textContent += ` ${parseInt(humidity)} %`;
      windElement.textContent += ` ${parseInt(wind)} km/h`;
    }
    weather();

    descriptionElement.innerHTML = "";
    temperatureElement.innerHTML = "Temperature:";
    humidityElement.innerHTML = "Humidity:";
    windElement.innerHTML = "Wind Speed:";
    rainElement.innerHTML = "Will rain?";
  });
});

// // Button Search

buttonSearch.addEventListener("click", () => {
  const city = document.querySelector("#search-input").value;
  const urlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
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

    const forecast = dataWeather.list.slice(0, 8);
    const willRain = forecast.some(
      (hour) => hour.weather[0].main.toLowerCase() === "rain"
    );

    if (willRain) {
      rainElement.textContent += " Si";
    } else {
      rainElement.textContent += " No";
    }

    const descrip = dataWeather.list[0].weather[0].description;
    const temp = dataWeather.list[0].main.temp;
    const conversionKelvin = 273.15;
    const humidity = dataWeather.list[0].main.humidity;
    const wind = dataWeather.list[0].wind.speed;

    descriptionElement.textContent += descrip;
    temperatureElement.textContent += ` ${parseInt(
      temp - conversionKelvin
    )} ºC`;
    humidityElement.textContent += ` ${parseInt(humidity)} %`;
    windElement.textContent += ` ${parseInt(wind)} km/h`;
  }
  weather();

  descriptionElement.innerHTML = "";
  temperatureElement.innerHTML = "Temperature:";
  humidityElement.innerHTML = "Humidity:";
  windElement.innerHTML = "Wind Speed:";
  rainElement.innerHTML = "Will rain?";
});
