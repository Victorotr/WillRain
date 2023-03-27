"use strict";

const buttonGeolocation = document.querySelector("#find-me");
const buttonSearch = document.querySelector("#search");
const liElement = document.querySelector(".main");
const temperatureElement = document.querySelector(".temp");

const APIKey = "ff1890d6b5c6ab10a7a079f29d86c7eb";
buttonGeolocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((dataWeather) => {
        console.log(dataWeather);
        // const forecast = dataWeather.hourly.slice(0, 8);
        // const willRain = forecast.some(
        //   (hour) => hour.weather[0].main.toLowerCase() === "rain" // Probabilidad de lluvia??
        // );
        // if (willRain) {
        //   liElement.textContent += " Si";
        // } else {
        //   liElement.textContent += " No";
        // }
        // const temp = dataWeather.daily[0].temp.day;
        // temperatureElement.textContent += ` ${temp}`;
      });
  });
});

buttonSearch.addEventListener("click", () => {
  const city = document.querySelector("#search-input").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((dataWeather) => {
      console.log(dataWeather);
      const willRain = dataWeather.weather[0].main.toLowerCase() === "rain"; // Probabilidad de lluvia??

      if (willRain) {
        liElement.textContent += " Si";
      } else {
        liElement.textContent += " No";
      }
    });
});
