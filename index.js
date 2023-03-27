"use strict";

// Selectores

const buttonGeolocation = document.querySelector("#find-me");
const buttonSearch = document.querySelector("#search");
const descriptionElement = document.querySelector(".description");
const temperatureElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind_speed");
const liElement = document.querySelector(".main");

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
        liElement.textContent += " Si";
      } else {
        liElement.textContent += " No";
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
    liElement.innerHTML = "¿Lloverá en las próximas 8 horas?";
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
      liElement.textContent += " Si";
    } else {
      liElement.textContent += " No";
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
  liElement.innerHTML = "¿Lloverá en las próximas 8 horas?";
});

// Presionar enter

// buttonSearch.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     buttonSearch.click();
//   const city = document.querySelector("#search-input").value;
//   const urlCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
//   async function getWeather() {
//     try {
//       let response = await fetch(urlCity);
//       let data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("ERROR:", error);
//     }
//   }

//   async function weather() {
//     const dataWeather = await getWeather();
//     console.log(dataWeather);

//     const forecast = dataWeather.list.slice(0, 8);
//     const willRain = forecast.some(
//       (hour) => hour.weather[0].main.toLowerCase() === "rain"
//     );

//     if (willRain) {
//       liElement.textContent += " Si";
//     } else {
//       liElement.textContent += " No";
//     }

//     const descrip = dataWeather.list[0].weather[0].description;
//     const temp = dataWeather.list[0].main.temp;
//     const conversionKelvin = 273.15;
//     const humidity = dataWeather.list[0].main.humidity;
//     const wind = dataWeather.list[0].wind.speed;

//     descriptionElement.textContent += descrip;
//     temperatureElement.textContent += ` ${parseInt(
//       temp - conversionKelvin
//     )} ºC`;
//     humidityElement.textContent += ` ${parseInt(humidity)} %`;
//     windElement.textContent += ` ${parseInt(wind)} km/h`;
//   }
//   weather();

//   descriptionElement.innerHTML = "";
//   temperatureElement.innerHTML = "Temperature:";
//   humidityElement.innerHTML = "Humidity:";
//   windElement.innerHTML = "Wind Speed:";
//   liElement.innerHTML = "¿Lloverá en las próximas 8 horas?";
//   }
// });
